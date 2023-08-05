from __future__ import unicode_literals

import datetime
import itertools
import yaml

from django.apps import apps
from django.core.cache import cache
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.core.validators import MaxLengthValidator
from django.db import models, transaction
from django.db.models import Q, F
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible
from django.utils.lru_cache import lru_cache
from django.utils.translation import ugettext_lazy as _
from django_fsm import FSMIntegerField
from django_fsm import transition
from jsonfield import JSONField
from model_utils import FieldTracker
from model_utils.models import TimeStampedModel
from model_utils.fields import AutoCreatedField
from taggit.managers import TaggableManager
import pyvat

from nodeconductor.core import fields as core_fields
from nodeconductor.core import models as core_models
from nodeconductor.core import utils as core_utils
from nodeconductor.core.models import CoordinatesMixin, AbstractFieldTracker
from nodeconductor.core.tasks import send_task
from nodeconductor.monitoring.models import MonitoringModelMixin
from nodeconductor.quotas import models as quotas_models, fields as quotas_fields
from nodeconductor.logging.loggers import LoggableMixin
from nodeconductor.structure.managers import StructureManager, filter_queryset_for_user, ServiceSettingsManager
from nodeconductor.structure.signals import structure_role_granted, structure_role_revoked
from nodeconductor.structure.signals import customer_account_credited, customer_account_debited
from nodeconductor.structure.images import ImageModelMixin
from nodeconductor.structure import SupportedServices
from nodeconductor.structure.utils import get_coordinates_by_ip, sort_dependencies


def validate_service_type(service_type):
    from django.core.exceptions import ValidationError
    if not SupportedServices.has_service_type(service_type):
        raise ValidationError('Invalid service type')


class StructureModel(models.Model):
    """ Generic structure model.
        Provides transparent interaction with base entities and relations like customer.
    """

    objects = StructureManager()

    class Meta(object):
        abstract = True

    def __getattr__(self, name):
        # add additional properties to the object according to defined Permissions class
        fields = ('customer', 'project')
        if name in fields:
            try:
                path = getattr(self.Permissions, name + '_path')
            except AttributeError:
                pass
            else:
                if not path == 'self' and '__' in path:
                    return reduce(getattr, path.split('__'), self)

        raise AttributeError(
            "'%s' object has no attribute '%s'" % (self._meta.object_name, name))


class StructureLoggableMixin(LoggableMixin):

    @classmethod
    def get_permitted_objects_uuids(cls, user):
        """
        Return query dictionary to search objects available to user.
        """
        uuids = filter_queryset_for_user(cls.objects.all(), user).values_list('uuid', flat=True)
        key = core_utils.camel_case_to_underscore(cls.__name__) + '_uuid'
        return {key: uuids}


class TagMixin(models.Model):
    """
    Add tags field and manage cache for tags.
    """
    class Meta:
        abstract = True

    tags = TaggableManager(related_name='+', blank=True)

    def get_tags(self):
        key = self._get_tag_cache_key()
        tags = cache.get(key)
        if tags is None:
            tags = list(self.tags.all().values_list('name', flat=True))
            cache.set(key, tags)
        return tags

    def clean_tag_cache(self):
        key = self._get_tag_cache_key()
        cache.delete(key)

    def _get_tag_cache_key(self):
        return 'tags:%s' % core_utils.serialize_instance(self)


class VATException(Exception):
    pass


class VATMixin(models.Model):
    """
    Add country, VAT number fields and check results from EU VAT Information Exchange System.
    Allows to compute VAT charge rate.
    """
    class Meta(object):
        abstract = True

    vat_code = models.CharField(max_length=20, blank=True, help_text='VAT number')
    vat_name = models.CharField(max_length=255, blank=True,
                                help_text='Optional business name retrieved for the VAT number.')
    vat_address = models.CharField(max_length=255, blank=True,
                                   help_text='Optional business address retrieved for the VAT number.')

    is_company = models.BooleanField(default=False, help_text="Is company or private person")
    country = core_fields.CountryField(blank=True)

    def get_vat_rate(self):
        charge = self.get_vat_charge()
        if charge.action == pyvat.VatChargeAction.charge:
            return charge.rate
        # Return None, if reverse_charge or no_charge action is applied

    def get_vat_charge(self):
        if not self.country:
            raise VATException('Unable to get VAT charge because buyer country code is not specified.')

        seller_country = settings.NODECONDUCTOR.get('SELLER_COUNTRY_CODE')
        if not seller_country:
            raise VATException('Unable to get VAT charge because seller country code is not specified.')

        return pyvat.get_sale_vat_charge(
            datetime.date.today(),
            pyvat.ItemType.generic_electronic_service,
            pyvat.Party(self.country, self.is_company and self.vat_code),
            pyvat.Party(seller_country, True)
        )


class BasePermission(models.Model):
    class Meta(object):
        abstract = True

    user = models.ForeignKey(settings.AUTH_USER_MODEL, db_index=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, related_name='+')
    created = AutoCreatedField()
    expiration_time = models.DateTimeField(null=True, blank=True)
    is_active = models.NullBooleanField(default=True, db_index=True)

    @classmethod
    def get_url_name(cls):
        raise NotImplementedError

    @classmethod
    def get_expired(cls):
        return cls.objects.filter(expiration_time__lt=timezone.now(), is_active=True)

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]

    def revoke(self):
        raise NotImplementedError


class PermissionMixin(object):
    """
    Base permission management mixin for customer and project.
    It is expected that reverse `permissions` relation is created for this model.
    Provides method to grant, revoke and check object permissions.
    """

    def has_user(self, user, role=None):
        permissions = self.permissions.filter(user=user, is_active=True)

        if role is not None:
            permissions = permissions.filter(role=role)

        return permissions.exists()

    @transaction.atomic()
    def add_user(self, user, role, created_by=None, expiration_time=None):
        permission = self.permissions.filter(user=user, role=role, is_active=True).first()
        if permission:
            return permission, False

        permission = self.permissions.create(
            user=user,
            role=role,
            is_active=True,
            created_by=created_by,
            expiration_time=expiration_time,
        )

        structure_role_granted.send(
            sender=self.__class__,
            structure=self,
            user=user,
            role=role,
        )

        return permission, True

    @transaction.atomic()
    def remove_user(self, user, role=None):
        permissions = self.permissions.all().filter(user=user, is_active=True)

        if role is not None:
            permissions = permissions.filter(role=role)

        affected_permissions = list(permissions)
        permissions.update(is_active=None, expiration_time=timezone.now())

        for permission in affected_permissions:
            self.log_role_revoked(permission)

    @transaction.atomic()
    def remove_all_users(self):
        for permission in self.permissions.all().iterator():
            permission.delete()
            self.log_role_revoked(permission)

    def log_role_revoked(self, permission):
        structure_role_revoked.send(
            sender=self.__class__,
            structure=self,
            user=permission.user,
            role=permission.role,
        )


class CustomerRole(models.CharField):
    OWNER = 'owner'
    SUPPORT = 'support'

    CHOICES = (
        (OWNER, 'Owner'),
        (SUPPORT, 'Support'),
    )

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 30
        kwargs['choices'] = self.CHOICES
        super(CustomerRole, self).__init__(*args, **kwargs)


@python_2_unicode_compatible
class CustomerPermission(BasePermission):
    class Meta(object):
        unique_together = ('customer', 'role', 'user', 'is_active')

    class Permissions(object):
        customer_path = 'customer'

    customer = models.ForeignKey('structure.Customer', verbose_name=_('organization'), related_name='permissions')
    role = CustomerRole(db_index=True)

    @classmethod
    def get_url_name(cls):
        return 'customer_permission'

    def revoke(self):
        self.customer.remove_user(self.user, self.role)

    def __str__(self):
        return '%s | %s' % (self.customer.name, self.get_role_display())


@python_2_unicode_compatible
class Customer(core_models.UuidMixin,
               core_models.NameMixin,
               core_models.DescendantMixin,
               quotas_models.QuotaModelMixin,
               PermissionMixin,
               VATMixin,
               LoggableMixin,
               ImageModelMixin,
               TimeStampedModel,
               StructureModel):
    class Permissions(object):
        customer_path = 'self'
        project_path = 'projects'

    native_name = models.CharField(max_length=160, default='', blank=True)
    abbreviation = models.CharField(max_length=8, blank=True)
    contact_details = models.TextField(blank=True, validators=[MaxLengthValidator(500)])

    registration_code = models.CharField(max_length=160, default='', blank=True)

    balance = models.DecimalField(max_digits=9, decimal_places=3, null=True, blank=True)

    class Meta(object):
        verbose_name = _('organization')

    GLOBAL_COUNT_QUOTA_NAME = 'nc_global_customer_count'

    class Quotas(quotas_models.QuotaModelMixin.Quotas):
        nc_project_count = quotas_fields.CounterQuotaField(
            target_models=lambda: [Project],
            path_to_scope='customer',
        )
        nc_service_count = quotas_fields.CounterQuotaField(
            target_models=lambda: Service.get_all_models(),
            path_to_scope='customer',
        )
        nc_service_project_link_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ServiceProjectLink.get_all_models(),
            path_to_scope='project.customer',
        )
        nc_user_count = quotas_fields.QuotaField()
        nc_resource_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ResourceMixin.get_all_models(),
            path_to_scope='project.customer',
        )
        nc_app_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ApplicationMixin.get_all_models(),
            path_to_scope='project.customer',
        )
        nc_vm_count = quotas_fields.CounterQuotaField(
            target_models=lambda: VirtualMachineMixin.get_all_models(),
            path_to_scope='project.customer',
        )
        nc_private_cloud_count = quotas_fields.CounterQuotaField(
            target_models=lambda: PrivateCloud.get_all_models(),
            path_to_scope='project.customer',
        )
        nc_storage_count = quotas_fields.CounterQuotaField(
            target_models=lambda: Storage.get_all_models(),
            path_to_scope='project.customer',
        )

    def get_log_fields(self):
        return ('uuid', 'name', 'abbreviation', 'contact_details')

    def credit_account(self, amount):
        # Increase customer's balance by specified amount
        new_balance = (self.balance or 0) + amount
        self._meta.model.objects.filter(uuid=self.uuid).update(
            balance=new_balance if self.balance is None else F('balance') + amount)

        self.balance = new_balance
        BalanceHistory.objects.create(customer=self, amount=self.balance)
        customer_account_credited.send(sender=Customer, instance=self, amount=float(amount))

    def debit_account(self, amount):
        # Reduce customer's balance at specified amount
        new_balance = (self.balance or 0) - amount
        self._meta.model.objects.filter(uuid=self.uuid).update(
            balance=new_balance if self.balance is None else F('balance') - amount)

        self.balance = new_balance
        BalanceHistory.objects.create(customer=self, amount=self.balance)
        customer_account_debited.send(sender=Customer, instance=self, amount=float(amount))

        # Fully prepaid mode
        # TODO: Introduce threshold value to allow over-usage
        if new_balance <= 0:
            send_task('structure', 'stop_customer_resources')(self.uuid.hex)

    def get_owners(self):
        return get_user_model().objects.filter(
            customerpermission__customer=self,
            customerpermission__is_active=True,
            customerpermission__role=CustomerRole.OWNER,
        )

    def get_support_users(self):
        return get_user_model().objects.filter(
            customerpermission__customer=self,
            customerpermission__is_active=True,
            customerpermission__role=CustomerRole.SUPPORT,
        )

    def get_users(self):
        """ Return all connected to customer users """
        return get_user_model().objects.filter(
            Q(customerpermission__customer=self,
              customerpermission__is_active=True) |
            Q(projectpermission__project__customer=self,
              projectpermission__is_active=True)
        ).distinct()

    def can_user_update_quotas(self, user):
        return user.is_staff

    def get_children(self):
        return itertools.chain.from_iterable(
            m.objects.filter(customer=self) for m in [Project] + Service.get_all_models())

    @classmethod
    def get_permitted_objects_uuids(cls, user):
        if user.is_staff:
            customer_queryset = cls.objects.all()
        else:
            customer_queryset = cls.objects.filter(
                permissions__user=user,
                permissions__role=CustomerRole.OWNER,
                permissions__is_active=True
            )
        return {'customer_uuid': filter_queryset_for_user(customer_queryset, user).values_list('uuid', flat=True)}

    def __str__(self):
        return '%(name)s (%(abbreviation)s)' % {
            'name': self.name,
            'abbreviation': self.abbreviation
        }


class BalanceHistory(models.Model):
    customer = models.ForeignKey(Customer, verbose_name=_('organization'))
    created = AutoCreatedField()
    amount = models.DecimalField(max_digits=9, decimal_places=3)


class ProjectRole(models.CharField):
    ADMINISTRATOR = 'admin'
    MANAGER = 'manager'
    SUPPORT = 'support'

    CHOICES = (
        (ADMINISTRATOR, 'Administrator'),
        (MANAGER, 'Manager'),
        (SUPPORT, 'Support'),
    )

    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 30
        kwargs['choices'] = self.CHOICES
        super(ProjectRole, self).__init__(*args, **kwargs)


@python_2_unicode_compatible
class ProjectPermission(core_models.UuidMixin, BasePermission):
    class Meta(object):
        unique_together = ('project', 'role', 'user', 'is_active')

    class Permissions(object):
        customer_path = 'project__customer'
        project_path = 'project'

    project = models.ForeignKey('structure.Project', related_name='permissions')
    role = ProjectRole(db_index=True)

    @classmethod
    def get_url_name(cls):
        return 'project_permission'

    def revoke(self):
        self.project.remove_user(self.user, self.role)

    def __str__(self):
        return '%s | %s' % (self.project.name, self.get_role_display())


@python_2_unicode_compatible
class Project(core_models.DescribableMixin,
              core_models.UuidMixin,
              core_models.NameMixin,
              core_models.DescendantMixin,
              quotas_models.QuotaModelMixin,
              PermissionMixin,
              StructureLoggableMixin,
              TimeStampedModel,
              StructureModel):
    class Permissions(object):
        customer_path = 'customer'
        project_path = 'self'

    GLOBAL_COUNT_QUOTA_NAME = 'nc_global_project_count'

    class Quotas(quotas_models.QuotaModelMixin.Quotas):
        nc_resource_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ResourceMixin.get_all_models(),
            path_to_scope='project',
        )
        nc_app_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ApplicationMixin.get_all_models(),
            path_to_scope='project',
        )
        nc_vm_count = quotas_fields.CounterQuotaField(
            target_models=lambda: VirtualMachineMixin.get_all_models(),
            path_to_scope='project',
        )
        nc_private_cloud_count = quotas_fields.CounterQuotaField(
            target_models=lambda: PrivateCloud.get_all_models(),
            path_to_scope='project',
        )
        nc_storage_count = quotas_fields.CounterQuotaField(
            target_models=lambda: Storage.get_all_models(),
            path_to_scope='project',
        )
        nc_service_project_link_count = quotas_fields.CounterQuotaField(
            target_models=lambda: ServiceProjectLink.get_all_models(),
            path_to_scope='project',
        )

    customer = models.ForeignKey(
        Customer, verbose_name=_('organization'), related_name='projects', on_delete=models.PROTECT)
    tracker = FieldTracker()

    @property
    def full_name(self):
        return self.name

    def get_users(self, role=None):
        query = Q(
            projectpermission__project=self,
            projectpermission__is_active=True,
        )
        if role:
            query = query & Q(projectpermission__role=role)

        return get_user_model().objects.filter(query)

    def __str__(self):
        return '%(name)s | %(customer)s' % {
            'name': self.name,
            'customer': self.customer.name
        }

    def can_user_update_quotas(self, user):
        return user.is_staff

    def get_log_fields(self):
        return ('uuid', 'customer', 'name')

    def get_parents(self):
        return [self.customer]

    def get_children(self):
        """
        Get all service project links connected to current project
        """
        return itertools.chain.from_iterable(
            m.objects.filter(project=self) for m in ServiceProjectLink.get_all_models())


@python_2_unicode_compatible
class ServiceSettings(quotas_models.ExtendableQuotaModelMixin,
                      core_models.UuidMixin,
                      core_models.NameMixin,
                      core_models.StateMixin,
                      TagMixin,
                      LoggableMixin):

    class Meta:
        verbose_name = "Service settings"
        verbose_name_plural = "Service settings"

    class Permissions(object):
        customer_path = 'customer'
        extra_query = dict(shared=True)

    customer = models.ForeignKey(Customer, verbose_name=_('organization'), related_name='service_settings', blank=True, null=True)
    backend_url = models.URLField(max_length=200, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)
    domain = models.CharField(max_length=200, blank=True, null=True)
    token = models.CharField(max_length=255, blank=True, null=True)
    certificate = models.FileField(upload_to='certs', blank=True, null=True)
    type = models.CharField(max_length=255, db_index=True, validators=[validate_service_type])
    options = JSONField(default={}, help_text='Extra options', blank=True)
    shared = models.BooleanField(default=False, help_text='Anybody can use it')

    tracker = FieldTracker()

    # service settings scope - VM that contains service
    content_type = models.ForeignKey(ContentType, null=True)
    object_id = models.PositiveIntegerField(null=True)
    scope = GenericForeignKey('content_type', 'object_id')

    objects = ServiceSettingsManager('scope')

    def get_backend(self, **kwargs):
        return SupportedServices.get_service_backend(self.type)(self, **kwargs)

    def get_option(self, name):
        options = self.options or {}
        if name in options:
            return options.get(name)
        else:
            defaults = self.get_backend().DEFAULTS
            return defaults.get(name)

    def __str__(self):
        return '%s (%s)' % (self.name, self.get_type_display())

    def get_log_fields(self):
        return ('uuid', 'name', 'customer')

    def _get_log_context(self, entity_name):
        context = super(ServiceSettings, self)._get_log_context(entity_name)
        context['service_settings_type'] = self.get_type_display()
        return context

    def get_type_display(self):
        return SupportedServices.get_name_for_type(self.type)

    def get_services(self):
        service_model = SupportedServices.get_service_models()[self.type]['service']
        return service_model.objects.filter(settings=self)

    def unlink_descendants(self):
        for service in self.get_services():
            service.unlink_descendants()
            service.delete()


@python_2_unicode_compatible
class Service(core_models.UuidMixin,
              core_models.NameMixin,
              core_models.DescendantMixin,
              quotas_models.QuotaModelMixin,
              LoggableMixin,
              StructureModel):
    """ Base service class. """

    class Meta(object):
        abstract = True
        unique_together = ('customer', 'settings')

    class Permissions(object):
        customer_path = 'customer'
        project_path = 'projects'

    settings = models.ForeignKey(ServiceSettings)
    customer = models.ForeignKey(Customer, verbose_name=_('organization'))
    available_for_all = models.BooleanField(
        default=False,
        help_text="Service will be automatically added to all customers projects if it is available for all"
    )
    projects = NotImplemented

    def __init__(self, *args, **kwargs):
        AbstractFieldTracker().finalize_class(self.__class__, 'tracker')
        super(Service, self).__init__(*args, **kwargs)

    def __str__(self):
        return self.name

    def get_backend(self, **kwargs):
        return self.settings.get_backend(**kwargs)

    @property
    def full_name(self):
        return ' / '.join([self.settings.name, self.name])

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]

    @classmethod
    def get_url_name(cls):
        """ This name will be used by generic relationships to membership model for URL creation """
        return cls._meta.app_label

    def get_log_fields(self):
        return ('uuid', 'name', 'customer')

    def _get_log_context(self, entity_name):
        context = super(Service, self)._get_log_context(entity_name)
        context['service_type'] = SupportedServices.get_name_for_model(self)
        return context

    def get_service_project_links(self):
        """
        Generic method for getting queryset of service project links related to current service
        """
        return self.projects.through.objects.filter(service=self)

    def get_parents(self):
        return [self.settings, self.customer]

    def get_children(self):
        return self.get_service_project_links()

    def unlink_descendants(self):
        descendants = sort_dependencies(self._meta.model, self.get_descendants())
        for descendant in descendants:
            if isinstance(descendant, ResourceMixin):
                descendant.unlink()
            descendant.delete()


class BaseServiceProperty(core_models.UuidMixin, core_models.NameMixin, models.Model):
    """ Base service properties like image, flavor, region,
        which are usually used for Resource provisioning.
    """

    class Meta(object):
        abstract = True

    @classmethod
    def get_url_name(cls):
        """ This name will be used by generic relationships to membership model for URL creation """
        return '{}-{}'.format(cls._meta.app_label, cls.__name__.lower())


@python_2_unicode_compatible
class ServiceProperty(BaseServiceProperty):

    class Meta(object):
        abstract = True
        unique_together = ('settings', 'backend_id')

    settings = models.ForeignKey(ServiceSettings, related_name='+')
    backend_id = models.CharField(max_length=255, db_index=True)

    def __str__(self):
        return '{0} | {1}'.format(self.name, self.settings)


@python_2_unicode_compatible
class GeneralServiceProperty(BaseServiceProperty):
    """
    Service property which is not connected to settings
    """

    class Meta(object):
        abstract = True

    backend_id = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


@python_2_unicode_compatible
class ServiceProjectLink(quotas_models.QuotaModelMixin,
                         core_models.DescendantMixin,
                         LoggableMixin,
                         StructureModel):
    """ Base service-project link class. See Service class for usage example. """

    class Meta(object):
        abstract = True
        unique_together = ('service', 'project')

    class Permissions(object):
        customer_path = 'service__customer'
        project_path = 'project'

    service = NotImplemented
    project = models.ForeignKey(Project)

    def get_backend(self, **kwargs):
        return self.service.get_backend(**kwargs)

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]

    @classmethod
    def get_url_name(cls):
        """ This name will be used by generic relationships to membership model for URL creation """
        return cls._meta.app_label + '-spl'

    def get_log_fields(self):
        return ('project', 'service',)

    def get_parents(self):
        return [self.project, self.service]

    def get_children(self):
        resource_models = [m for m in ResourceMixin.get_all_models()
                           if m.service_project_link.field.related_model == self.__class__]
        return itertools.chain.from_iterable(
            m.objects.filter(service_project_link=self) for m in resource_models)

    def __str__(self):
        return '{0} | {1}'.format(self.service.name, self.project.name)


def validate_yaml(value):
    try:
        yaml.load(value)
    except yaml.error.YAMLError:
        raise ValidationError('A valid YAML value is required.')


class ApplicationMixin(models.Model):

    class Meta(object):
        abstract = True

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]


class VirtualMachineMixin(CoordinatesMixin):
    def __init__(self, *args, **kwargs):
        AbstractFieldTracker().finalize_class(self.__class__, 'tracker')
        super(VirtualMachineMixin, self).__init__(*args, **kwargs)

    cores = models.PositiveSmallIntegerField(default=0, help_text='Number of cores in a VM')
    ram = models.PositiveIntegerField(default=0, help_text='Memory size in MiB')
    disk = models.PositiveIntegerField(default=0, help_text='Disk size in MiB')
    min_ram = models.PositiveIntegerField(default=0, help_text='Minimum memory size in MiB')
    min_disk = models.PositiveIntegerField(default=0, help_text='Minimum disk size in MiB')

    external_ips = models.GenericIPAddressField(null=True, blank=True, protocol='IPv4')
    internal_ips = models.GenericIPAddressField(null=True, blank=True, protocol='IPv4')

    image_name = models.CharField(max_length=150, blank=True)

    key_name = models.CharField(max_length=50, blank=True)
    key_fingerprint = models.CharField(max_length=47, blank=True)

    user_data = models.TextField(
        blank=True, validators=[validate_yaml],
        help_text='Additional data that will be added to instance on provisioning')

    class Meta(object):
        abstract = True

    def detect_coordinates(self):
        if self.external_ips:
            return get_coordinates_by_ip(self.external_ips)

    def get_access_url(self):
        if self.external_ips:
            return self.external_ips
        if self.internal_ips:
            return self.internal_ips
        return None

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]


class PublishableMixin(models.Model):
    """ Provide publishing_state field """

    class Meta(object):
        abstract = True

    class PublishingState(object):
        NOT_PUBLISHED = 'not published'
        PUBLISHED = 'published'
        REQUESTED = 'requested'

        CHOICES = ((NOT_PUBLISHED, _('Not published')), (PUBLISHED, _('Published')), (REQUESTED, _('Requested')))

    publishing_state = models.CharField(
        max_length=30, choices=PublishingState.CHOICES, default=PublishingState.NOT_PUBLISHED)


# XXX: This class should be deleted after NC-1237 implementation
class OldStateResourceMixin(core_models.ErrorMessageMixin, models.Model):
    """ Provides old-style states for resources """

    class Meta(object):
        abstract = True

    class States(object):
        PROVISIONING_SCHEDULED = 1
        PROVISIONING = 2

        ONLINE = 3
        OFFLINE = 4

        STARTING_SCHEDULED = 5
        STARTING = 6

        STOPPING_SCHEDULED = 7
        STOPPING = 8

        ERRED = 9

        DELETION_SCHEDULED = 10
        DELETING = 11

        RESIZING_SCHEDULED = 13
        RESIZING = 14

        RESTARTING_SCHEDULED = 15
        RESTARTING = 16

        CHOICES = (
            (PROVISIONING_SCHEDULED, 'Provisioning Scheduled'),
            (PROVISIONING, 'Provisioning'),

            (ONLINE, 'Online'),
            (OFFLINE, 'Offline'),

            (STARTING_SCHEDULED, 'Starting Scheduled'),
            (STARTING, 'Starting'),

            (STOPPING_SCHEDULED, 'Stopping Scheduled'),
            (STOPPING, 'Stopping'),

            (ERRED, 'Erred'),

            (DELETION_SCHEDULED, 'Deletion Scheduled'),
            (DELETING, 'Deleting'),

            (RESIZING_SCHEDULED, 'Resizing Scheduled'),
            (RESIZING, 'Resizing'),

            (RESTARTING_SCHEDULED, 'Restarting Scheduled'),
            (RESTARTING, 'Restarting'),
        )

        # Stable instances are the ones for which
        # tasks are scheduled or are in progress

        STABLE_STATES = set([ONLINE, OFFLINE])
        UNSTABLE_STATES = set([
            s for (s, _) in CHOICES
            if s not in STABLE_STATES
        ])

    state = FSMIntegerField(
        default=States.PROVISIONING_SCHEDULED,
        choices=States.CHOICES,
        help_text="WARNING! Should not be changed manually unless you really know what you are doing.")

    @transition(field=state,
                source=States.PROVISIONING_SCHEDULED,
                target=States.PROVISIONING)
    def begin_provisioning(self):
        pass

    @transition(field=state,
                source=[States.PROVISIONING, States.STOPPING, States.RESIZING],
                target=States.OFFLINE)
    def set_offline(self):
        pass

    @transition(field=state,
                source=States.OFFLINE,
                target=States.STARTING_SCHEDULED)
    def schedule_starting(self):
        pass

    @transition(field=state,
                source=States.STARTING_SCHEDULED,
                target=States.STARTING)
    def begin_starting(self):
        pass

    @transition(field=state,
                source=[States.STARTING, States.PROVISIONING, States.RESTARTING],
                target=States.ONLINE)
    def set_online(self):
        pass

    @transition(field=state,
                source=States.ONLINE,
                target=States.STOPPING_SCHEDULED)
    def schedule_stopping(self):
        pass

    @transition(field=state,
                source=States.STOPPING_SCHEDULED,
                target=States.STOPPING)
    def begin_stopping(self):
        pass

    @transition(field=state,
                source=[States.OFFLINE, States.ERRED],
                target=States.DELETION_SCHEDULED)
    def schedule_deletion(self):
        pass

    @transition(field=state,
                source=States.DELETION_SCHEDULED,
                target=States.DELETING)
    def begin_deleting(self):
        pass

    @transition(field=state,
                source=States.OFFLINE,
                target=States.RESIZING_SCHEDULED)
    def schedule_resizing(self):
        pass

    @transition(field=state,
                source=States.RESIZING_SCHEDULED,
                target=States.RESIZING)
    def begin_resizing(self):
        pass

    @transition(field=state,
                source=States.RESIZING,
                target=States.OFFLINE)
    def set_resized(self):
        pass

    @transition(field=state,
                source=States.ONLINE,
                target=States.RESTARTING_SCHEDULED)
    def schedule_restarting(self):
        pass

    @transition(field=state,
                source=States.RESTARTING_SCHEDULED,
                target=States.RESTARTING)
    def begin_restarting(self):
        pass

    @transition(field=state,
                source=States.RESTARTING,
                target=States.ONLINE)
    def set_restarted(self):
        pass

    @transition(field=state,
                source='*',
                target=States.ERRED)
    def set_erred(self):
        pass


@python_2_unicode_compatible
class ResourceMixin(MonitoringModelMixin,
                    core_models.UuidMixin,
                    core_models.DescribableMixin,
                    core_models.NameMixin,
                    core_models.DescendantMixin,
                    LoggableMixin,
                    TagMixin,
                    TimeStampedModel,
                    StructureModel):

    """ Base resource class. Resource is a provisioned entity of a service,
        for example: a VM in OpenStack or AWS, or a repository in Github.
    """

    class Meta(object):
        abstract = True

    class Permissions(object):
        customer_path = 'service_project_link__project__customer'
        project_path = 'service_project_link__project'
        service_path = 'service_project_link__service'

    service_project_link = NotImplemented
    backend_id = models.CharField(max_length=255, blank=True)
    start_time = models.DateTimeField(blank=True, null=True)

    def get_backend(self, **kwargs):
        return self.service_project_link.get_backend(**kwargs)

    def get_cost(self, start_date, end_date):
        raise NotImplementedError(
            "Please refer to nodeconductor.billing.tasks.debit_customers while implementing it")

    def get_access_url(self):
        # default behaviour. Override in subclasses if applicable
        return None

    def get_access_url_name(self):
        return None

    @classmethod
    @lru_cache(maxsize=1)
    def get_all_models(cls):
        return [model for model in apps.get_models() if issubclass(model, cls)]

    @classmethod
    def get_url_name(cls):
        """ This name will be used by generic relationships to membership model for URL creation """
        return '{}-{}'.format(cls._meta.app_label, cls.__name__.lower())

    def get_log_fields(self):
        return ('uuid', 'name', 'service_project_link', 'full_name')

    @property
    def full_name(self):
        return '%s %s' % (SupportedServices.get_name_for_model(self).replace('.', ' '), self.name)

    def _get_log_context(self, entity_name):
        context = super(ResourceMixin, self)._get_log_context(entity_name)
        # XXX: Add resource_full_name here, because event context does not support properties as fields
        context['resource_full_name'] = self.full_name
        # required for lookups in ElasticSearch by the client
        context['resource_type'] = SupportedServices.get_name_for_model(self)

        # XXX: a hack for IaaS / PaaS / SaaS tags
        # XXX: should be moved to itacloud assembly
        if self.tags.filter(name='IaaS').exists():
            context['resource_delivery_model'] = 'IaaS'
        elif self.tags.filter(name='PaaS').exists():
            context['resource_delivery_model'] = 'PaaS'
        elif self.tags.filter(name='SaaS').exists():
            context['resource_delivery_model'] = 'SaaS'

        return context

    def filter_by_logged_object(self):
        return {
            'resource_uuid': self.uuid.hex,
            'resource_type': SupportedServices.get_name_for_model(self)
        }

    def get_parents(self):
        return [self.service_project_link]

    def __str__(self):
        return self.name

    def increase_backend_quotas_usage(self, validate=True):
        """ Increase usage of quotas that were consumed by resource on creation.

            If validate is True - method should raise QuotaValidationError if
            at least one of increased quotas if over limit.
        """
        pass

    def decrease_backend_quotas_usage(self):
        """ Decrease usage of quotas that were released on resource deletion """
        pass

    def unlink(self):
        # XXX: add special attribute to an instance in order to be tracked by signal handler
        setattr(self, 'PERFORM_UNLINK', True)


# deprecated, use NewResource instead.
class Resource(OldStateResourceMixin, ResourceMixin):

    class Meta(object):
        abstract = True


class NewResource(ResourceMixin, core_models.StateMixin):

    class Meta(object):
        abstract = True


class PublishableResource(PublishableMixin, Resource):

    class Meta(object):
        abstract = True


class PrivateCloud(quotas_models.QuotaModelMixin, core_models.RuntimeStateMixin, NewResource):
    extra_configuration = JSONField(default={}, help_text='Configuration details that are not represented on backend.')

    class Meta(object):
        abstract = True


class Storage(core_models.RuntimeStateMixin, NewResource):
    size = models.PositiveIntegerField(help_text='Size in MiB')

    class Meta(object):
        abstract = True
