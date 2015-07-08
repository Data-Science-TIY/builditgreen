# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
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
        migrations.RemoveField(
            model_name='state',
            name='population',
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
