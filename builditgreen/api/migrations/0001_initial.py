# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.IntegerField(serialize=False, primary_key=True)),
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
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('abbreviation', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('population', models.IntegerField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='state_id',
            field=models.ForeignKey(to='api.State'),
        ),
    ]
