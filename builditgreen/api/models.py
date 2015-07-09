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






