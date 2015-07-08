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
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('is_confidential', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255, null=True)),
                ('street', models.CharField(max_length=255, null=True)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('zip_code', models.CharField(max_length=10)),
                ('country', models.CharField(max_length=255)),
                ('leed_version', models.CharField(max_length=255)),
                ('points_achieved', models.IntegerField(null=True)),
                ('certification_level', models.CharField(max_length=255, null=True)),
                ('certification_date', models.DateField()),
                ('owner_types', models.CharField(max_length=255, null=True)),
                ('gross_square_foot', models.IntegerField(null=True)),
                ('total_property_area', models.IntegerField(null=True)),
                ('project_types', models.CharField(max_length=255, null=True)),
                ('registration_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, primary_key=True, verbose_name='ID')),
                ('abbreviation', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('population', models.IntegerField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='us_state',
            field=models.ForeignKey(to='api.State'),
        ),
    ]
