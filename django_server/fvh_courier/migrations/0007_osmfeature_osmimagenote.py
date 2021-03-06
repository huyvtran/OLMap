# Generated by Django 3.0.2 on 2020-01-24 08:17

from django.db import migrations, models
import fvh_courier.models


class Migration(migrations.Migration):

    dependencies = [
        ('fvh_courier', '0006_packagesms'),
    ]

    operations = [
        migrations.CreateModel(
            name='OSMFeature',
            fields=[
                ('id', models.BigIntegerField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='OSMImageNote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('lat', models.DecimalField(decimal_places=8, max_digits=11)),
                ('lon', models.DecimalField(decimal_places=8, max_digits=11)),
                ('image', models.ImageField(blank=True, null=True, upload_to=fvh_courier.models.upload_osm_images_to)),
                ('comment', models.TextField(blank=True)),
                ('osm_features', models.ManyToManyField(to='fvh_courier.OSMFeature')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
