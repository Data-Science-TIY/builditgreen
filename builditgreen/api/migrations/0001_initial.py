# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BuildingPermit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('year', models.IntegerField(null=True)),
                ('total', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='HousingPermit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('year', models.IntegerField(null=True)),
                ('total', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Population',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('year', models.IntegerField(null=True)),
                ('total', models.IntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('is_confidential', models.CharField(max_length=255)),
                ('name', models.CharField(null=True, max_length=255)),
                ('street', models.CharField(null=True, max_length=255)),
                ('city', models.CharField(null=True, max_length=255)),
                ('zip_code', models.CharField(null=True, max_length=255)),
                ('country', models.CharField(null=True, max_length=255)),
                ('leed_version', models.CharField(null=True, max_length=255)),
                ('points_achieved', models.IntegerField(null=True)),
                ('certification_level', models.CharField(null=True, max_length=255)),
                ('certification_date', models.DateField(null=True)),
                ('owner_types', models.CharField(null=True, max_length=255)),
                ('gross_square_foot', models.BigIntegerField(null=True)),
                ('total_property_area', models.BigIntegerField(null=True)),
                ('project_types', models.CharField(null=True, max_length=255)),
                ('registration_date', models.DateField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('abbreviation', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='state_id',
            field=models.ForeignKey(to='api.State'),
        ),
        migrations.AddField(
            model_name='population',
            name='state_id',
            field=models.ForeignKey(to='api.State'),
        ),
        migrations.AddField(
            model_name='housingpermit',
            name='state_id',
            field=models.ForeignKey(to='api.State'),
        ),
        migrations.AddField(
            model_name='buildingpermit',
            name='state_id',
            field=models.ForeignKey(to='api.State'),
        ),
    ]
