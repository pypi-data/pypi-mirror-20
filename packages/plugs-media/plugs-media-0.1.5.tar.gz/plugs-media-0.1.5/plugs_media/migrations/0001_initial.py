# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-01-07 19:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name_plural': 'media',
                'verbose_name': 'media',
            },
        ),
    ]
