# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='population',
            name='state_id',
        ),
        migrations.AddField(
            model_name='state',
            name='population',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='Population',
        ),
    ]
