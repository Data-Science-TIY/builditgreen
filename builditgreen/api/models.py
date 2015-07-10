from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class State(models.Model):
    abbreviation = models.CharField(max_length=255)
    name = models.CharField(max_length=255)


class Project(models.Model):
    id = models.IntegerField(primary_key=True)
    is_confidential = models.CharField(max_length=255)
    name = models.CharField(max_length=255, null=True)
    street = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    zip_code = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    leed_version = models.CharField(max_length=255, null=True)
    points_achieved = models.IntegerField(null=True)
    certification_level = models.CharField(max_length=255, null=True)
    certification_date = models.DateField(null=True)
    owner_types = models.CharField(max_length=255, null=True)
    gross_square_foot = models.BigIntegerField(null=True)
    total_property_area = models.BigIntegerField(null=True)
    project_types = models.CharField(max_length=255, null=True)
    registration_date = models.DateField(null=True)
    state_id = models.ForeignKey(State)
    #project_types_list = ArrayField(models.CharField(max_length=255), blank=True)
    #not sure if we need blank


class BuildingPermit(models.Model):
    state_id = models.ForeignKey(State)
    year = models.IntegerField(null=True)
    total = models.IntegerField(null=True)


class HousingPermit(models.Model):
    state_id = models.ForeignKey(State)
    year = models.IntegerField(null=True)
    total = models.IntegerField(null=True)


class Population(models.Model):
    state_id = models.ForeignKey(State)
    year = models.IntegerField(null=True)
    total = models.IntegerField(null=True)


class ScoreTwoPointOne(models.Model):
    project = models.OneToOneField(Project)
    ssc1 = models.IntegerField(null=True)
    ssc2 = models.IntegerField(null=True)
    ssc3 = models.IntegerField(null=True)
    ssc4_1 = models.IntegerField(null=True)
    ssc4_2 = models.IntegerField(null=True)
    ssc4_3 = models.IntegerField(null=True)
    ssc4_4 = models.IntegerField(null=True)
    ssc5_1 = models.IntegerField(null=True)
    ssc5_2 = models.IntegerField(null=True)
    ssc6_1 = models.IntegerField(null=True)
    ssc6_2 = models.IntegerField(null=True)
    ssc7_1 = models.IntegerField(null=True)
    ssc7_2 = models.IntegerField(null=True)
    ssc8 = models.IntegerField(null=True)
    wec1_1 = models.IntegerField(null=True)
    wec1_2 = models.IntegerField(null=True)
    wec2 = models.IntegerField(null=True)
    wec3_1 = models.IntegerField(null=True)
    wec3_2 = models.IntegerField(null=True)
    eac1 = models.IntegerField(null=True)
    eac2_1 = models.IntegerField(null=True)
    eac2_2 = models.IntegerField(null=True)
    eac2_3 = models.IntegerField(null=True)
    eac3 = models.IntegerField(null=True)
    eac4 = models.IntegerField(null=True)
    eac5 = models.IntegerField(null=True)
    eac6 = models.IntegerField(null=True)
    mrc1_1 = models.IntegerField(null=True)
    mrc1_2 = models.IntegerField(null=True)
    mrc1_3 = models.IntegerField(null=True)
    mrc2_1 = models.IntegerField(null=True)
    mrc2_2 = models.IntegerField(null=True)
    mrc3_1 = models.IntegerField(null=True)
    mrc3_2 = models.IntegerField(null=True)
    mrc4_1 = models.IntegerField(null=True)
    mrc4_2 = models.IntegerField(null=True)
    mrc5_1 = models.IntegerField(null=True)
    mrc5_2 = models.IntegerField(null=True)
    mrc6 = models.IntegerField(null=True)
    mrc7 = models.IntegerField(null=True)
    eqc1 = models.IntegerField(null=True)
    eqc2 = models.IntegerField(null=True)
    eqc3_1 = models.IntegerField(null=True)
    eqc3_2 = models.IntegerField(null=True)
    eqc4_1 = models.IntegerField(null=True)
    eqc4_2 = models.IntegerField(null=True)
    eqc4_3 = models.IntegerField(null=True)
    eqc4_4 = models.IntegerField(null=True)
    eqc5 = models.IntegerField(null=True)
    eqc6_1 = models.IntegerField(null=True)
    eqc6_2 = models.IntegerField(null=True)
    eqc7_1 = models.IntegerField(null=True)
    eqc7_2 = models.IntegerField(null=True)
    eqc8_1 = models.IntegerField(null=True)
    eqc8_2 = models.IntegerField(null=True)
    idc1 = models.IntegerField(null=True)
    idc2 = models.IntegerField(null=True)


class ScoreTwoPointTwo(models.Model):
    project = models.OneToOneField(Project)
    ssc1 = models.IntegerField(null=True)
    ssc2 = models.IntegerField(null=True)
    ssc3 = models.IntegerField(null=True)
    ssc4_1 = models.IntegerField(null=True)
    ssc4_2 = models.IntegerField(null=True)
    ssc4_3 = models.IntegerField(null=True)
    ssc4_4 = models.IntegerField(null=True)
    ssc5_1 = models.IntegerField(null=True)
    ssc5_2 = models.IntegerField(null=True)
    ssc6_1 = models.IntegerField(null=True)
    ssc6_2 = models.IntegerField(null=True)
    ssc7_1 = models.IntegerField(null=True)
    ssc7_2 = models.IntegerField(null=True)
    ssc8 = models.IntegerField(null=True)
    wec1_1 = models.IntegerField(null=True)
    wec1_2 = models.IntegerField(null=True)
    wec2 = models.IntegerField(null=True)
    wec3_1 = models.IntegerField(null=True)
    wec3_2 = models.IntegerField(null=True)
    eac1 = models.IntegerField(null=True)
    eac2 = models.IntegerField(null=True)
    eac3 = models.IntegerField(null=True)
    eac4 = models.IntegerField(null=True)
    eac5 = models.IntegerField(null=True)
    eac6 = models.IntegerField(null=True)
    mrc1_1 = models.IntegerField(null=True)
    mrc1_2 = models.IntegerField(null=True)
    mrc1_3 = models.IntegerField(null=True)
    mrc2_1 = models.IntegerField(null=True)
    mrc2_2 = models.IntegerField(null=True)
    mrc3_1 = models.IntegerField(null=True)
    mrc3_2 = models.IntegerField(null=True)
    mrc4_1 = models.IntegerField(null=True)
    mrc4_2 = models.IntegerField(null=True)
    mrc5_1 = models.IntegerField(null=True)
    mrc5_2 = models.IntegerField(null=True)
    mrc6 = models.IntegerField(null=True)
    mrc7 = models.IntegerField(null=True)
    eqc1 = models.IntegerField(null=True)
    eqc2 = models.IntegerField(null=True)
    eqc3_1 = models.IntegerField(null=True)
    eqc3_2 = models.IntegerField(null=True)
    eqc4_1 = models.IntegerField(null=True)
    eqc4_2 = models.IntegerField(null=True)
    eqc4_3 = models.IntegerField(null=True)
    eqc4_4 = models.IntegerField(null=True)
    eqc5 = models.IntegerField(null=True)
    eqc6_1 = models.IntegerField(null=True)
    eqc6_2 = models.IntegerField(null=True)
    eqc7_1 = models.IntegerField(null=True)
    eqc7_2 = models.IntegerField(null=True)
    eqc8_1 = models.IntegerField(null=True)
    eqc8_2 = models.IntegerField(null=True)
    idc1 = models.IntegerField(null=True)
    idc2 = models.IntegerField(null=True)


class Score2009(models.Model):
    project = models.OneToOneField(Project)
    ssc1 = models.IntegerField(null=True)
    ssc2 = models.IntegerField(null=True)
    ssc3 = models.IntegerField(null=True)
    ssc4_1 = models.IntegerField(null=True)
    ssc4_2 = models.IntegerField(null=True)
    ssc4_3 = models.IntegerField(null=True)
    ssc4_4 = models.IntegerField(null=True)
    ssc5_1 = models.IntegerField(null=True)
    ssc5_2 = models.IntegerField(null=True)
    ssc6_1 = models.IntegerField(null=True)
    ssc6_2 = models.IntegerField(null=True)
    ssc7_1 = models.IntegerField(null=True)
    ssc7_2 = models.IntegerField(null=True)
    ssc8 = models.IntegerField(null=True)
    wec1 = models.IntegerField(null=True)
    wec2 = models.IntegerField(null=True)
    wec3 = models.IntegerField(null=True)
    eac1 = models.IntegerField(null=True)
    eac2 = models.IntegerField(null=True)
    eac3 = models.IntegerField(null=True)
    eac4 = models.IntegerField(null=True)
    eac5 = models.IntegerField(null=True)
    eac6 = models.IntegerField(null=True)
    mrc1_1 = models.IntegerField(null=True)
    mrc1_2 = models.IntegerField(null=True)
    mrc2 = models.IntegerField(null=True)
    mrc3 = models.IntegerField(null=True)
    mrc4 = models.IntegerField(null=True)
    mrc5 = models.IntegerField(null=True)
    mrc6 = models.IntegerField(null=True)
    mrc7 = models.IntegerField(null=True)
    eqc1 = models.IntegerField(null=True)
    eqc2 = models.IntegerField(null=True)
    eqc3_1 = models.IntegerField(null=True)
    eqc3_2 = models.IntegerField(null=True)
    eqc4_1 = models.IntegerField(null=True)
    eqc4_2 = models.IntegerField(null=True)
    eqc4_3 = models.IntegerField(null=True)
    eqc4_4 = models.IntegerField(null=True)
    eqc5 = models.IntegerField(null=True)
    eqc6_1 = models.IntegerField(null=True)
    eqc6_2 = models.IntegerField(null=True)
    eqc7_1 = models.IntegerField(null=True)
    eqc7_2 = models.IntegerField(null=True)
    eqc8_1 = models.IntegerField(null=True)
    eqc8_2 = models.IntegerField(null=True)
    idc1 = models.IntegerField(null=True)
    idc2 = models.IntegerField(null=True)
    extra1 = models.IntegerField(null=True)
    extra2 = models.IntegerField(null=True)
    extra3 = models.IntegerField(null=True)
    extra4 = models.IntegerField(null=True)
