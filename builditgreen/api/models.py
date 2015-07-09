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
    SSc1 = models.IntegerField(null=True)
    SSc2 = models.IntegerField(null=True)
    SSc3 = models.IntegerField(null=True)
    SSc4_1 = models.IntegerField(null=True)
    SSc4_2 = models.IntegerField(null=True)
    SSc4_3 = models.IntegerField(null=True)
    SSc4_4 = models.IntegerField(null=True)
    SSc5_1 = models.IntegerField(null=True)
    SSc5_2 = models.IntegerField(null=True)
    SSc6_1 = models.IntegerField(null=True)
    SSc6_2 = models.IntegerField(null=True)
    SSc7_1 = models.IntegerField(null=True)
    SSc7_2 = models.IntegerField(null=True)
    SSc8 = models.IntegerField(null=True)
    WEc1_1 = models.IntegerField(null=True)
    WEc1_2 = models.IntegerField(null=True)
    WEc2 = models.IntegerField(null=True)
    WEc3_1 = models.IntegerField(null=True)
    WEc3_2 = models.IntegerField(null=True)
    EAc1 = models.IntegerField(null=True)
    EAc2_1 = models.IntegerField(null=True)
    EAc2_2 = models.IntegerField(null=True)
    EAc2_3 = models.IntegerField(null=True)
    EAc3 = models.IntegerField(null=True)
    EAc4 = models.IntegerField(null=True)
    EAc5 = models.IntegerField(null=True)
    EAc6 = models.IntegerField(null=True)
    MRc1_1 = models.IntegerField(null=True)
    MRc1_2 = models.IntegerField(null=True)
    MRc1_3 = models.IntegerField(null=True)
    MRc2_1 = models.IntegerField(null=True)
    MRc2_2 = models.IntegerField(null=True)
    MRc3_1 = models.IntegerField(null=True)
    MRc3_2 = models.IntegerField(null=True)
    MRc4_1 = models.IntegerField(null=True)
    MRc4_2 = models.IntegerField(null=True)
    MRc5_1 = models.IntegerField(null=True)
    MRc5_2 = models.IntegerField(null=True)
    MRc6 = models.IntegerField(null=True)
    MRc7 = models.IntegerField(null=True)
    EQc1 = models.IntegerField(null=True)
    EQc2 = models.IntegerField(null=True)
    EQc3_1 = models.IntegerField(null=True)
    EQc3_2 = models.IntegerField(null=True)
    EQc4_1 = models.IntegerField(null=True)
    EQc4_2 = models.IntegerField(null=True)
    EQc6_1 = models.IntegerField(null=True)
    EQc4_3 = models.IntegerField(null=True)
    EQc4_4 = models.IntegerField(null=True)
    EQc5 = models.IntegerField(null=True)
    EQc6_2 = models.IntegerField(null=True)
    EQc7_1 = models.IntegerField(null=True)
    EQc7_2 = models.IntegerField(null=True)
    EQc8_1 = models.IntegerField(null=True)
    EQc8_2 = models.IntegerField(null=True)
    IDc1 = models.IntegerField(null=True)
    IDc2 = models.IntegerField(null=True)