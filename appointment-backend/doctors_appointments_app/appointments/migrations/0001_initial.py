# Generated by Django 3.2.5 on 2022-02-08 17:21

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment_settings_per_station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frequency_of_AP_per_2hours', models.IntegerField()),
                ('doctor_account', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='filled_date_choices_per_station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fully_booked_dates', models.DateField()),
                ('aps_per_station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.appointment_settings_per_station')),
            ],
        ),
        migrations.CreateModel(
            name='Booked_appointments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appointment_time', models.TimeField(choices=[(datetime.time(8, 0), '08:00'), (datetime.time(10, 0), '10:00'), (datetime.time(12, 0), '12:00'), (datetime.time(14, 0), '14:00'), (datetime.time(16, 0), '16:00')])),
                ('appointment_date', models.DateField()),
                ('doctor_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('patient_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patient_booked_appointments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='available_time_choices_per_station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('available_appointment_time', models.TimeField(choices=[(datetime.time(8, 0), '08:00'), (datetime.time(10, 0), '10:00'), (datetime.time(12, 0), '12:00'), (datetime.time(14, 0), '14:00'), (datetime.time(16, 0), '16:00')])),
                ('aps_per_station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.appointment_settings_per_station')),
            ],
        ),
    ]