# Generated by Django 3.0.6 on 2020-12-27 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('highcairnapp', '0002_auto_20201227_0844'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='public',
            field=models.BooleanField(default=False),
        ),
    ]
