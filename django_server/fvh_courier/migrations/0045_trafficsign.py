# Generated by Django 3.1 on 2020-09-28 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fvh_courier', '0044_import_turku_addresses'),
    ]

    operations = [
        migrations.CreateModel(
            name='TrafficSign',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, choices=[['Max height', 'Max height'], ['Max weight', 'Max weight'], ['No stopping', 'No stopping'], ['No parking', 'No parking'], ['Loading zone', 'Loading zone'], ['Parking', 'Parking']], max_length=32)),
                ('text', models.CharField(blank=True, max_length=128)),
                ('image_note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fvh_courier.osmimagenote')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
