# Generated by Django 3.0.5 on 2020-06-04 09:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('holvi_orders', '0002_auto_20200331_1347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holvipurchaseanswer',
            name='answer',
            field=models.CharField(blank=True, max_length=256),
        ),
    ]
