# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20150710_1606'),
    ]

    operations = [
        migrations.AddField(
            model_name='score2009',
            name='eac1_possible',
            field=models.IntegerField(default=19),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eac2_possible',
            field=models.IntegerField(default=7),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eac3_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eac4_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eac5_possible',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eac6_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc4_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc4_4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc5_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc8_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='eqc8_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='extra1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='extra2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='extra3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='extra4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='idc1_possible',
            field=models.IntegerField(default=5),
        ),
        migrations.AddField(
            model_name='score2009',
            name='idc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc1_1_possible',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc1_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc2_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc3_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc4_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc5_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc6_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='mrc7_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc2_possible',
            field=models.IntegerField(default=5),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc4_1_possible',
            field=models.IntegerField(default=6),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc4_3_possible',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc4_4_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc5_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc5_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='ssc8_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='score2009',
            name='wec1_possible',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='score2009',
            name='wec2_possible',
            field=models.IntegerField(default=2),
        ),
        migrations.AddField(
            model_name='score2009',
            name='wec3_possible',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac1_possible',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac2_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac2_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac2_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac5_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eac6_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc4_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc4_4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc5_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc8_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='eqc8_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='idc1_possible',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='idc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc1_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc1_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc1_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc2_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc2_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc5_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc5_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc6_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='mrc7_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc4_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc4_4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc5_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc5_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='ssc8_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='wec1_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='wec1_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='wec2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='wec3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointone',
            name='wec3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac1_possible',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac2_possible',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac5_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eac6_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc4_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc4_4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc5_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc8_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='eqc8_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='idc1_possible',
            field=models.IntegerField(default=4),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='idc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc1_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc1_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc1_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc2_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc2_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc3_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc5_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc5_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc6_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='mrc7_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc4_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc4_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc4_3_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc4_4_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc5_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc5_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc6_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc6_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc7_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc7_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='ssc8_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='wec1_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='wec1_2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='wec2_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='wec3_1_possible',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='scoretwopointtwo',
            name='wec3_2_possible',
            field=models.IntegerField(default=1),
        ),
    ]
