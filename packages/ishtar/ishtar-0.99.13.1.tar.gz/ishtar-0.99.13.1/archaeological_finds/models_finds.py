#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Copyright (C) 2012-2016 Étienne Loks  <etienne.loks_AT_peacefrogsDOTnet>

# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

# See the file COPYING for details.

import datetime

from django.conf import settings
from django.contrib.gis.db import models
from django.core.urlresolvers import reverse
from django.db.models import Max, Q
from django.db.models.signals import m2m_changed, post_save, post_delete
from django.utils.translation import ugettext_lazy as _, ugettext

from ishtar_common.utils import cached_label_changed, post_save_point

from ishtar_common.models import GeneralType, ImageModel, BaseHistorizedItem, \
    ShortMenuItem, LightHistorizedItem, HistoricalRecords, OwnPerms, Source, \
    Person, Basket, get_external_id, post_save_cache

from archaeological_operations.models import AdministrativeAct
from archaeological_context_records.models import ContextRecord, Dating

from ishtar_common.models import PRIVATE_FIELDS, SpatialReferenceSystem
from archaeological_warehouse.models import Container, Collection


class MaterialType(GeneralType):
    code = models.CharField(_(u"Code"), max_length=10, blank=True, null=True)
    recommendation = models.TextField(_(u"Recommendation"), blank=True,
                                      null=True)
    parent = models.ForeignKey("MaterialType", blank=True, null=True,
                               verbose_name=_(u"Parent material"))

    class Meta:
        verbose_name = _(u"Material type")
        verbose_name_plural = _(u"Material types")
        ordering = ('label',)
post_save.connect(post_save_cache, sender=MaterialType)
post_delete.connect(post_save_cache, sender=MaterialType)


class ConservatoryState(GeneralType):
    parent = models.ForeignKey("ConservatoryState", blank=True, null=True,
                               verbose_name=_(u"Parent conservatory state"))

    class Meta:
        verbose_name = _(u"Conservatory state")
        verbose_name_plural = _(u"Conservatory states")
        ordering = ('label',)
post_save.connect(post_save_cache, sender=ConservatoryState)
post_delete.connect(post_save_cache, sender=ConservatoryState)


class PreservationType(GeneralType):
    class Meta:
        verbose_name = _(u"Preservation type")
        verbose_name_plural = _(u"Preservation types")
        ordering = ('label',)
post_save.connect(post_save_cache, sender=PreservationType)
post_delete.connect(post_save_cache, sender=PreservationType)


class IntegrityType(GeneralType):
    class Meta:
        verbose_name = _(u"Integrity / interest type")
        verbose_name_plural = _(u"Integrity / interest types")
        ordering = ('label',)
post_save.connect(post_save_cache, sender=IntegrityType)
post_delete.connect(post_save_cache, sender=IntegrityType)


class RemarkabilityType(GeneralType):
    class Meta:
        verbose_name = _(u"Remarkability type")
        verbose_name_plural = _(u"Remarkability types")
        ordering = ('label',)
post_save.connect(post_save_cache, sender=RemarkabilityType)
post_delete.connect(post_save_cache, sender=RemarkabilityType)


class BatchType(GeneralType):
    order = models.IntegerField(_(u"Order"), default=10)
    class Meta:
        verbose_name = _(u"Batch type")
        verbose_name_plural = _(u"Batch types")
        ordering = ('order',)
post_save.connect(post_save_cache, sender=BatchType)
post_delete.connect(post_save_cache, sender=BatchType)


class ObjectType(GeneralType):
    parent = models.ForeignKey("ObjectType", blank=True, null=True,
                               verbose_name=_(u"Parent"))

    class Meta:
        verbose_name = _(u"Object type")
        verbose_name_plural = _(u"Object types")
        ordering = ('parent__label', 'label',)

    def full_label(self):
        lbls = [self.label]
        item = self
        while item.parent:
            item = item.parent
            lbls.append(item.label)
        return u" > ".join(reversed(lbls))

    def __unicode__(self):
        return self.label
post_save.connect(post_save_cache, sender=ObjectType)
post_delete.connect(post_save_cache, sender=ObjectType)


class BaseFind(BaseHistorizedItem, OwnPerms):
    label = models.TextField(_(u"Free ID"))
    external_id = models.TextField(_(u"External ID"), blank=True, null=True)
    auto_external_id = models.BooleanField(
        _(u"External ID is set automatically"), default=False)
    description = models.TextField(_(u"Description"), blank=True, null=True)
    comment = models.TextField(_(u"Comment"), blank=True, null=True)
    special_interest = models.CharField(_(u"Special interest"), blank=True,
                                        null=True, max_length=120)
    context_record = models.ForeignKey(
        ContextRecord, related_name='base_finds',
        verbose_name=_(u"Context Record"))
    discovery_date = models.DateField(_(u"Discovery date"),
                                      blank=True, null=True)
    batch = models.ForeignKey(BatchType, verbose_name=_(u"Batch/object"),
                              blank=True, null=True)
    index = models.IntegerField(u"Index", default=0)
    material_index = models.IntegerField(_(u"Material index"), default=0)
    topographic_localisation = models.CharField(
        _(u"Point of topographic reference"), blank=True, null=True,
        max_length=120)
    x = models.FloatField(_(u'X'), blank=True, null=True)
    y = models.FloatField(_(u'Y'), blank=True, null=True)
    z = models.FloatField(_(u'Z'), blank=True, null=True)
    estimated_error_x = models.FloatField(_(u'Estimated error for X'),
                                          blank=True, null=True)
    estimated_error_y = models.FloatField(_(u'Estimated error for Y'),
                                          blank=True, null=True)
    estimated_error_z = models.FloatField(_(u'Estimated error for Z'),
                                          blank=True, null=True)
    spatial_reference_system = models.ForeignKey(
        SpatialReferenceSystem, verbose_name=_(u"Spatial Reference System"),
        blank=True, null=True)
    point_2d = models.PointField(_(u"Point (2D)"), blank=True, null=True)
    point = models.PointField(_(u"Point"), blank=True, null=True, dim=3)
    line = models.LineStringField(_(u"Line"), blank=True, null=True)
    polygon = models.PolygonField(_(u"Polygon"), blank=True, null=True)
    cache_short_id = models.TextField(
        _(u"Short ID"), blank=True, null=True,
        help_text=_(u"Cached value - do not edit"))
    cache_complete_id = models.TextField(
        _(u"Complete ID"), blank=True, null=True,
        help_text=_(u"Cached value - do not edit"))
    history = HistoricalRecords()
    RELATED_POST_PROCESS = ['find']

    class Meta:
        verbose_name = _(u"Base find")
        verbose_name_plural = _(u"Base finds")
        permissions = (
            ("view_basefind", ugettext(u"Can view all Base finds")),
            ("view_own_basefind", ugettext(u"Can view own Base find")),
            ("add_own_basefind", ugettext(u"Can add own Base find")),
            ("change_own_basefind", ugettext(u"Can change own Base find")),
            ("delete_own_basefind", ugettext(u"Can delete own Base find")),
        )

    def __unicode__(self):
        return self.label

    def get_last_find(self):
        # TODO: manage virtuals - property(last_find) ?
        finds = self.find.filter().order_by("-order").all()
        return finds and finds[0]

    @classmethod
    def get_max_index(cls, operation):
        q = BaseFind.objects \
            .filter(context_record__operation=operation)
        if q.count():
            return q.aggregate(Max('index'))['index__max']
        return 0

    def complete_id(self):
        # OPE|MAT.CODE|UE|FIND_index
        if not self.context_record.operation:
            return
        # find = self.get_last_find()
        ope = self.context_record.operation
        c_id = [unicode(ope.code_patriarche) if ope.code_patriarche else
                (unicode(ope.year) + "-" + unicode(ope.operation_code))]
        materials = set()
        for find in self.find.filter(downstream_treatment__isnull=True):
            for mat in find.material_types.all():
                if mat.code:
                    materials.add(mat.code)
        c_id.append(u'-'.join(sorted(list(materials))))
        c_id.append(self.context_record.label)
        max_index = str(self.get_max_index(ope))
        c_id.append((u'{:0' + str(len(max_index)) + 'd}').format(self.index))
        return settings.JOINT.join(c_id)

    def short_id(self):
        # OPE|FIND_index
        if not self.context_record.operation:
            return
        ope = self.context_record.operation
        c_id = [(ope.code_patriarche and unicode(ope.code_patriarche)) or
                (unicode(ope.year) + "-" + unicode(ope.operation_code))]
        max_index = str(self.get_max_index(ope))
        c_id.append((u'{:0' + str(len(max_index)) + 'd}').format(self.index))
        return settings.JOINT.join(c_id)

    def full_label(self):
        return self._real_label() or self._temp_label() or u""

    def material_type_label(self):
        find = self.get_last_find()
        finds = [find and find.material_type.code or '']
        ope = self.context_record.operation
        finds += [unicode(ope.code_patriarche) or
                  (unicode(ope.year) + "-" + unicode(ope.operation_code))]
        finds += [self.context_record.label, unicode(self.material_index)]
        return settings.JOINT.join(finds)

    def _real_label(self):
        if not self.context_record.parcel \
                or not self.context_record.operation \
                or not self.context_record.operation.code_patriarche:
            return
        find = self.get_last_find()
        lbl = find.label or self.label
        return settings.JOINT.join(
            [unicode(it) for it in (
                self.context_record.operation.code_patriarche,
                self.context_record.label, lbl) if it])

    def _temp_label(self):
        if not self.context_record.parcel:
            return
        find = self.get_last_find()
        lbl = find.label or self.label
        return settings.JOINT.join(
            [unicode(it) for it in (
                self.context_record.parcel.year, self.index,
                self.context_record.label, lbl) if it])

    @property
    def name(self):
        return self.label

    @classmethod
    def get_extra_fields(cls):
        fields = {}
        for field in Find._meta.many_to_many:
            if field.name == 'base_finds':
                fields['find'] = field.related.model
        return fields

    def save(self, *args, **kwargs):
        returned = super(BaseFind, self).save(*args, **kwargs)

        updated = False
        if not self.external_id or self.auto_external_id:
            external_id = get_external_id('base_find_external_id', self)
            if external_id != self.external_id:
                updated = True
                self.auto_external_id = True
                self.external_id = external_id
        if updated:
            self._cached_label_checked = False
            self.save()
        return returned

post_save.connect(post_save_point, sender=BaseFind)


WEIGHT_UNIT = (('g', _(u"g")),
               ('kg', _(u"kg")),)

CHECK_CHOICES = (('NC', _(u"Not checked")),
                 ('CI', _(u"Checked but incorrect")),
                 ('CC', _(u"Checked and correct")),
                 )


class FindBasket(Basket):
    items = models.ManyToManyField('Find', blank=True, null=True,
                                   related_name='basket')


class Find(BaseHistorizedItem, ImageModel, OwnPerms, ShortMenuItem):
    CHECK_DICT = dict(CHECK_CHOICES)
    SHOW_URL = 'show-find'
    SLUG = 'find'
    TABLE_COLS = ['label', 'material_types__label', 'datings__period__label',
                  'base_finds__context_record__parcel__town',
                  'base_finds__context_record__operation__year',
                  'base_finds__context_record__operation__operation_code',
                  'container__cached_label',
                  'base_finds__batch',
                  'base_finds__context_record__parcel__town',
                  'base_finds__context_record__parcel', ]
    if settings.COUNTRY == 'fr':
        TABLE_COLS.insert(
            6, 'base_finds__context_record__operation__code_patriarche')
    TABLE_COLS_FOR_OPE = [
        'base_finds__cache_short_id',
        'base_finds__cache_complete_id',
        'previous_id', 'label', 'material_types__label',
        'datings__period__label', 'find_number', 'object_types',
        'container__cached_label',
        'description',
        'base_finds__context_record__parcel__town',
        'base_finds__context_record__parcel', ]
    COL_LABELS = {
        'datings__period__label': _(u"Periods"),
        'container__cached_label': _(u"Container"),
        'material_types__label': _(u"Material types"),
    }

    EXTRA_FULL_FIELDS = [
        'base_finds__cache_short_id', 'base_finds__cache_complete_id',
        'base_finds__comment', 'base_finds__description',
        'base_finds__topographic_localisation',
        'base_finds__special_interest',
        'base_finds__discovery_date']
    EXTRA_FULL_FIELDS_LABELS = {
        'base_finds__cache_short_id': _(u"Base find - Short ID"),
        'base_finds__cache_complete_id': _(u"Base find - Complete ID"),
        'base_finds__comment': _(u"Base find - Comment"),
        'base_finds__description': _(u"Base find - Description"),
        'base_finds__topographic_localisation': _(u"Base find - "
                                                  u"Topographic localisation"),
        'base_finds__special_interest': _(u"Base find - Special interest"),
        'base_finds__discovery_date': _(u"Base find - Discovery date"),
    }
    ATTRS_EQUIV = {'get_first_base_find': 'base_finds'}

    # search parameters
    REVERSED_BOOL_FIELDS = ['image__isnull']
    RELATION_TYPES_PREFIX = {
        'ope_relation_types':
            'base_finds__context_record__operation__'}
    RELATIVE_SESSION_NAMES = [
        ('contextrecord', 'base_finds__context_record__pk'),
        ('operation', 'base_finds__context_record__operation__pk'),
        ('file', 'base_finds__context_record__operation__associated_file__pk')
    ]
    BASE_REQUEST = {'downstream_treatment__isnull': True}
    EXTRA_REQUEST_KEYS = {
        'base_finds__cache_short_id':
            'base_finds__cache_short_id__icontains',
        'base_finds__cache_complete_id':
            'base_finds__cache_complete_id__icontains',
        'label':
            'label__icontains',
        'base_finds__context_record':
            'base_finds__context_record__pk',
        'base_finds__context_record__parcel__town':
            'base_finds__context_record__parcel__town',
        'base_finds__context_record__operation__year':
            'base_finds__context_record__operation__year__contains',
        'base_finds__context_record__operation':
            'base_finds__context_record__operation__pk',
        'archaeological_sites':
            'base_finds__context_record__operation__archaeological_sites__pk',
        'base_finds__context_record__operation__code_patriarche':
            'base_finds__context_record__operation__code_patriarche',
        'datings__period': 'datings__period__pk',
        'material_types': 'material_types__pk',
        'base_finds__find__description':
            'base_finds__find__description__icontains',
        'base_finds__batch': 'base_finds__batch',
        'basket': 'basket',
        'cached_label': 'cached_label__icontains',
        'image': 'image__isnull'}
    EXTRA_REQUEST_KEYS.update(
        dict(
            [(key, key) for key in TABLE_COLS
             if key not in EXTRA_REQUEST_KEYS]
        )
    )
    EXTRA_REQUEST_KEYS.update(
        dict(
            [(key, key) for key in TABLE_COLS_FOR_OPE
             if key not in EXTRA_REQUEST_KEYS]
        )
    )

    # fields
    base_finds = models.ManyToManyField(BaseFind, verbose_name=_(u"Base find"),
                                        related_name='find')
    external_id = models.TextField(_(u"External ID"), blank=True, null=True)
    auto_external_id = models.BooleanField(
        _(u"External ID is set automatically"), default=False)
    order = models.IntegerField(_(u"Order"), default=1)
    label = models.TextField(_(u"Free ID"))
    description = models.TextField(_(u"Description"), blank=True, null=True)
    material_types = models.ManyToManyField(
        MaterialType, verbose_name=_(u"Material types"), related_name='finds')
    conservatory_state = models.ForeignKey(
        ConservatoryState, verbose_name=_(u"Conservatory state"), blank=True,
        null=True, on_delete=models.SET_NULL)
    conservatory_comment = models.TextField(_(u"Conservatory comment"),
                                            blank=True, null=True)
    preservation_to_considers = models.ManyToManyField(
        PreservationType, verbose_name=_(u"Type of preservation to consider"),
        related_name='finds')
    volume = models.FloatField(_(u"Volume (l)"), blank=True, null=True)
    weight = models.FloatField(_(u"Weight (g)"), blank=True, null=True)
    weight_unit = models.CharField(_(u"Weight unit"), max_length=4,
                                   blank=True, null=True, choices=WEIGHT_UNIT)
    find_number = models.IntegerField(_(u"Find number"), blank=True, null=True)
    upstream_treatment = models.ForeignKey(
        "Treatment", blank=True, null=True,
        related_name='downstream', on_delete=models.SET_NULL,
        verbose_name=_(u"Upstream treatment"))
    downstream_treatment = models.ForeignKey(
        "Treatment", blank=True, null=True, related_name='upstream',
        verbose_name=_(u"Downstream treatment"), on_delete=models.SET_NULL)
    datings = models.ManyToManyField(Dating, verbose_name=_(u"Dating"),
                                     related_name='find')
    container = models.ForeignKey(
        Container, verbose_name=_(u"Container"), blank=True, null=True,
        related_name='finds', on_delete=models.SET_NULL)
    is_complete = models.NullBooleanField(_(u"Is complete?"), blank=True,
                                          null=True)
    object_types = models.ManyToManyField(
        ObjectType, verbose_name=_(u"Object types"), related_name='find')
    integrities = models.ManyToManyField(
        IntegrityType, verbose_name=_(u"Integrity / interest"),
        related_name='find')
    remarkabilities = models.ManyToManyField(
        RemarkabilityType, verbose_name=_(u"Remarkability"),
        related_name='find')
    min_number_of_individuals = models.IntegerField(
        _(u"Minimum number of individuals (MNI)"), blank=True, null=True)
    length = models.FloatField(_(u"Length (cm)"), blank=True, null=True)
    width = models.FloatField(_(u"Width (cm)"), blank=True, null=True)
    height = models.FloatField(_(u"Height (cm)"), blank=True, null=True)
    diameter = models.FloatField(_(u"Diameter (cm)"), blank=True, null=True)
    thickness = models.FloatField(_(u"Thickness (cm)"), blank=True, null=True)
    dimensions_comment = models.TextField(_(u"Dimensions comment"),
                                          blank=True, null=True)
    mark = models.TextField(_(u"Mark"), blank=True, null=True)
    comment = models.TextField(_(u"Comment"), blank=True, null=True)
    dating_comment = models.TextField(_(u"Comment on dating"), blank=True,
                                      null=True)
    previous_id = models.TextField(_(u"Previous ID"), blank=True, null=True)
    index = models.IntegerField(u"Index", default=0)
    checked = models.CharField(_(u"Check"), max_length=2, default='NC',
                               choices=CHECK_CHOICES)
    check_date = models.DateField(_(u"Check date"),
                                  default=datetime.date.today)
    estimated_value = models.FloatField(_(u"Estimated value"), blank=True,
                                        null=True)
    collection = models.ForeignKey(
        Collection, verbose_name=_(u"Collection"), blank=True, null=True,
        related_name='finds', on_delete=models.SET_NULL)
    cached_label = models.TextField(_(u"Cached name"), null=True, blank=True)
    history = HistoricalRecords()
    BASKET_MODEL = FindBasket
    IMAGE_PREFIX = 'finds/'

    class Meta:
        verbose_name = _(u"Find")
        verbose_name_plural = _(u"Finds")
        permissions = (
            ("view_find", ugettext(u"Can view all Finds")),
            ("view_own_find", ugettext(u"Can view own Find")),
            ("add_own_find", ugettext(u"Can add own Find")),
            ("change_own_find", ugettext(u"Can change own Find")),
            ("delete_own_find", ugettext(u"Can delete own Find")),
        )
        ordering = ('cached_label',)

    @property
    def short_class_name(self):
        return _(u"FIND")

    def __unicode__(self):
        lbl = settings.JOINT.join(
            [getattr(self, attr) for attr in ('administrative_index', 'label')
             if getattr(self, attr)])
        return lbl

    @property
    def short_label(self):
        return self.reference

    @property
    def dating(self):
        return u" ; ".join([unicode(dating) for dating in self.datings.all()])

    @property
    def show_url(self):
        return reverse('show-find', args=[self.pk, ''])

    @property
    def name(self):
        return u" - ".join([base_find.name
                            for base_find in self.base_finds.all()])

    @property
    def full_label(self):
        lbl = u" - ".join([getattr(self, attr)
                           for attr in ('label', 'administrative_index')
                           if getattr(self, attr)])
        base = u" - ".join([base_find.complete_id()
                            for base_find in self.base_finds.all()])
        if base:
            lbl += u' ({})'.format(base)
        return lbl

    def get_first_base_find(self):
        q = self.base_finds
        if not q.count():
            return
        return q.order_by('-pk').all()[0]

    @property
    def reference(self):
        bf = self.get_first_base_find()
        if not bf:
            return "00"
        return bf.short_id()

    @property
    def administrative_index(self):
        bf = self.get_first_base_find()
        if not bf or not bf.context_record or not bf.context_record.operation:
            return ""
        return "{}-{}".format(
            bf.context_record.operation.get_reference(),
            self.index)

    def _get_treatments(self, model, rel='upstream', limit=None):
        treatments, findtreats = [], []
        q = model.objects.filter(
            find_id=self.pk).order_by(
            'treatment_nb', 'treatment__start_date',
            'treatment__end_date')
        for findtreat in q.distinct().all():
            if findtreat.pk in findtreats:
                continue
            findtreats.append(findtreat.pk)
            q = getattr(findtreat.treatment, rel).distinct().order_by(
                'label')
            if limit:
                q = q[:limit]
            treatments.append((q.all(), findtreat.treatment))
        return treatments

    @property
    def weight_string(self):
        if not self.weight:
            return ""
        return "{} {}".format(self.weight, self.weight_unit or "")

    def upstream_treatments(self, limit=None):
        from archaeological_finds.models_treatments import \
            FindUpstreamTreatments
        return self._get_treatments(FindUpstreamTreatments, 'upstream',
                                    limit=limit)

    def limited_upstream_treatments(self):
        return self.upstream_treatments(15)

    def downstream_treatments(self, limit=None):
        from archaeological_finds.models_treatments import \
            FindDownstreamTreatments
        return self._get_treatments(FindDownstreamTreatments, 'downstream',
                                    limit=limit)

    def limited_downstream_treatments(self):
        return self.downstream_treatments(15)

    def all_treatments(self):
        return self.upstream_treatments() + self.downstream_treatments()

    def get_department(self):
        bf = self.get_first_base_find()
        if not bf:
            return "00"
        return bf.context_record.operation.get_department()

    def get_town_label(self):
        bf = self.get_first_base_find()
        if not bf:
            return "00"
        return bf.context_record.operation.get_town_label()

    @classmethod
    def get_periods(cls, slice='year', fltr={}):
        q = cls.objects
        if fltr:
            q = q.filter(**fltr)
        if slice == 'year':
            years = set()
            finds = q.filter(downstream_treatment__isnull=True)
            for find in finds:
                bi = find.base_finds.all()
                if not bi:
                    continue
                bi = bi[0]
                if bi.context_record.operation.start_date:
                    yr = bi.context_record.operation.start_date.year
                    years.add(yr)
        return list(years)

    @classmethod
    def get_by_year(cls, year, fltr={}):
        q = cls.objects
        if fltr:
            q = q.filter(**fltr)
        return q.filter(
            downstream_treatment__isnull=True,
            base_finds__context_record__operation__start_date__year=year)

    @classmethod
    def get_operations(cls):
        operations = set()
        finds = cls.objects.filter(downstream_treatment__isnull=True)
        for find in finds:
            bi = find.base_finds.all()
            if not bi:
                continue
            bi = bi[0]
            pk = bi.context_record.operation.pk
            operations.add(pk)
        return list(operations)

    @classmethod
    def get_by_operation(cls, operation_id):
        return cls.objects.filter(
            downstream_treatment__isnull=True,
            base_finds__context_record__operation__pk=operation_id)

    @classmethod
    def get_total_number(cls, fltr={}):
        q = cls.objects
        if fltr:
            q = q.filter(**fltr)
        return q.filter(downstream_treatment__isnull=True).count()

    def duplicate(self, user):
        model = self.__class__
        # base fields
        table_cols = [field.name for field in model._meta.fields
                      if field.name not in PRIVATE_FIELDS or
                      field.name == 'order']
        dct = dict([(attr, getattr(self, attr)) for attr in
                    table_cols])
        dct['order'] += 1
        dct['history_modifier'] = user
        new = self.__class__(**dct)
        new.save()

        # m2m fields
        m2m = [field.name for field in model._meta.many_to_many
               if field.name not in PRIVATE_FIELDS]
        for field in m2m:
            for val in getattr(self, field).all():
                getattr(new, field).add(val)
        return new

    @classmethod
    def get_query_owns(cls, user):
        return Q(base_finds__context_record__operation__scientist=user.
                 ishtaruser.person) | \
            Q(base_finds__context_record__operation__in_charge=user.
              ishtaruser.person) | \
            Q(history_creator=user)

    @classmethod
    def get_owns(cls, user, menu_filtr=None, limit=None,
                 values=None, get_short_menu_class=None):
        replace_query = None
        if menu_filtr and 'contextrecord' in menu_filtr:
            replace_query = Q(
                base_finds__context_record=menu_filtr['contextrecord']
            )
        owns = super(Find, cls).get_owns(
            user, replace_query=replace_query, limit=limit, values=values,
            get_short_menu_class=get_short_menu_class)
        return cls._return_get_owns(owns, values, get_short_menu_class)

    def _generate_cached_label(self):
        return unicode(self)

    def save(self, *args, **kwargs):
        super(Find, self).save(*args, **kwargs)

        updated = False
        self.skip_history_when_saving = True
        if not self.external_id or self.auto_external_id:
            external_id = get_external_id('find_external_id', self)
            if external_id != self.external_id:
                updated = True
                self.auto_external_id = True
                self.external_id = external_id
        if updated:
            self._cached_label_checked = False
            self.save()
            return

        q = self.base_finds
        if not self.index and q.count():
            operation = q.filter(
                context_record__operation__pk__isnull=False).order_by(
                '-context_record__operation__start_date')
            if operation.count():
                operation = operation.all()[0].context_record.operation
                q = Find.objects \
                    .filter(base_finds__context_record__operation=operation)
                if self.pk:
                    q = q.exclude(pk=self.pk)
                if q.count():
                    self.index = q.aggregate(Max('index'))['index__max'] + 1
                else:
                    self.index = 1
                self._cached_label_checked = False
                self.save()
        for base_find in self.base_finds.filter(
                context_record__operation__pk__isnull=False).all():
            modified = False
            if not base_find.index:
                modified = True
                base_find.index = BaseFind.get_max_index(
                    base_find.context_record.operation) + 1
            short_id = base_find.short_id()
            if base_find.cache_short_id != short_id:
                base_find.cache_short_id = short_id
                modified = True
            complete_id = base_find.complete_id()
            if base_find.cache_complete_id != complete_id:
                base_find.cache_complete_id = complete_id
                modified = True
            if modified:
                base_find.skip_history_when_saving = True
                base_find._cached_label_checked = False
                base_find.save()
                # if not base_find.material_index:
                #    idx = BaseFind.objects\
                #                  .filter(context_record=base_find.context_record,
                #                          find__material_types=self.material_type)\
                #                  .aggregate(Max('material_index'))
                #    base_find.material_index = \
                #        idx and idx['material_index__max'] + 1 or 1


post_save.connect(cached_label_changed, sender=Find)


def base_find_find_changed(sender, **kwargs):
    obj = kwargs.get('instance', None)
    if not obj:
        return
    # recalculate complete id and external id
    obj.save()

m2m_changed.connect(base_find_find_changed, sender=Find.base_finds.through)


class FindSource(Source):
    SHOW_URL = 'show-findsource'
    MODIFY_URL = 'find_source_modify'
    TABLE_COLS = [
        'find__base_finds__context_record__operation',
        'find__base_finds__context_record', 'find'] + \
        Source.TABLE_COLS

    # search parameters
    BOOL_FIELDS = ['duplicate']
    RELATIVE_SESSION_NAMES = [
        ('find', 'find__pk'),
        ('contextrecord', 'find__base_finds__context_record__pk'),
        ('operation', 'find__base_finds__context_record__operation__pk'),
        ('file',
         'find__base_finds__context_record__operation__associated_file__pk')
    ]
    EXTRA_REQUEST_KEYS = {
        'title': 'title__icontains',
        'description': 'description__icontains',
        'comment': 'comment__icontains',
        'additional_information': 'additional_information__icontains',
        'person': 'authors__person__pk',
        'find__base_finds__context_record__operation__year':
            'find__base_finds__context_record__operation__year',
        'find__base_finds__context_record__operation__operation_code':
            'find__base_finds__context_record__operation__operation_code',
        'find__base_finds__context_record__operation__code_patriarche':
            'find__base_finds__context_record__operation__code_patriarche',
        'find__datings__period': 'find__datings__period__pk',
        'find__description': 'find__description__icontains',
    }

    class Meta:
        verbose_name = _(u"Find documentation")
        verbose_name_plural = _(u"Find documentations")
    find = models.ForeignKey(Find, verbose_name=_(u"Find"),
                             related_name="source")

    @property
    def owner(self):
        return self.find


class Property(LightHistorizedItem):
    find = models.ForeignKey(Find, verbose_name=_(u"Find"))
    administrative_act = models.ForeignKey(
        AdministrativeAct, verbose_name=_(u"Administrative act"))
    person = models.ForeignKey(Person, verbose_name=_(u"Person"),
                               related_name='properties')
    start_date = models.DateField(_(u"Start date"))
    end_date = models.DateField(_(u"End date"))

    class Meta:
        verbose_name = _(u"Property")
        verbose_name_plural = _(u"Properties")

    def __unicode__(self):
        return self.person + settings.JOINT + self.find
