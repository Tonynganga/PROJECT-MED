# Generated by Django 3.2.5 on 2022-03-14 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0010_alter_appointment_settings_per_station_appointment_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='available_time_choices_per_station',
            name='available_appointment_time',
            field=models.TimeField(choices=[('07:00', '07hours'), ('09:00', '09hours'), ('11:00', '11hours'), ('13:00', '13hours'), ('15:00', '15hours'), ('17:00', '17hours')]),
        ),
        migrations.AlterField(
            model_name='booked_appointments',
            name='appointment_time',
            field=models.TimeField(choices=[('07:00', '07hours'), ('09:00', '09hours'), ('11:00', '11hours'), ('13:00', '13hours'), ('15:00', '15hours'), ('17:00', '17hours')]),
        ),
        migrations.AlterField(
            model_name='filled_date_time_choices_per_station',
            name='booked_time',
            field=models.TimeField(choices=[('07:00', '07hours'), ('09:00', '09hours'), ('11:00', '11hours'), ('13:00', '13hours'), ('15:00', '15hours'), ('17:00', '17hours')]),
        ),
    ]
