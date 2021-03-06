# Generated by Django 3.0.2 on 2020-01-24 12:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('fvh_courier', '0007_osmfeature_osmimagenote'),
    ]

    operations = [
        migrations.AddField(
            model_name='osmimagenote',
            name='created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_notes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='osmimagenote',
            name='hidden_reason',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='osmimagenote',
            name='modified_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='modified_notes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='osmimagenote',
            name='reviewed_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviewed_notes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='osmimagenote',
            name='visible',
            field=models.BooleanField(default=True),
        ),
    ]
