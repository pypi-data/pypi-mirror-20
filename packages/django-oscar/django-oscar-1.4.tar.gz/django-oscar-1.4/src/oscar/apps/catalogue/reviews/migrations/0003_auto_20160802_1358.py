# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-02 10:58
from __future__ import unicode_literals

from django.db import migrations, models
import oscar.apps.catalogue.reviews.utils


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0002_update_email_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productreview',
            name='status',
            field=models.SmallIntegerField(choices=[(0, 'Requires moderation'), (1, 'Approved'), (2, 'Rejected')], default=oscar.apps.catalogue.reviews.utils.get_default_review_status, verbose_name='Status'),
        ),
    ]
