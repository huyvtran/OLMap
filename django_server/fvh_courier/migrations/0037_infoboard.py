# Generated by Django 3.0.5 on 2020-06-02 14:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fvh_courier', '0036_auto_20200601_1323'),
    ]

    operations = [
        migrations.CreateModel(
            name='InfoBoard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(blank=True, choices=[['map', 'map'], ['board', 'board']], default='board', max_length=32)),
                ('image_note', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fvh_courier.OSMImageNote')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
