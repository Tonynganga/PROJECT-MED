# Generated by Django 3.2.5 on 2022-02-14 18:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0005_alter_booked_appointments_doctor_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Filled_date_time_choices_per_station',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booked_dates', models.DateField()),
                ('booked_time', models.TimeField(choices=[('08:00', '08hours'), ('10:00', '10hours'), ('12:00', '12hours'), ('14:00', '14hours'), ('16:00', '16hours')])),
                ('is_filled', models.BooleanField(default=False)),
                ('aps_per_station', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.appointment_settings_per_station')),
            ],
        ),
        migrations.DeleteModel(
            name='filled_date_choices_per_station',
        ),
    ]