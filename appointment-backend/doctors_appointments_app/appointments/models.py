from django.db import models
import datetime
from accounts.models import User
from django.core.exceptions  import ValidationError

# Create your models here.

AT_8AM="08:00"
AT_10AM="10:00"
AT_12AM="12:00"
AT_2PM="14:00"
AT_4PM="16:00"

AVAILABLE_APPOINTMENT_TIME_CHOICES=(
    (AT_8AM,"08hours"),
    (AT_10AM,"10hours"),
    (AT_12AM,"12hours"),
    (AT_2PM,"14hours"),
    (AT_4PM,"16hours")
)


class Appointment_settings_per_station(models.Model): 
    '''
    save appointment settings saved by a doctor for their account
    '''   
    doctor_account=models.OneToOneField(User,on_delete=models.CASCADE,related_name='aps_per_station')
    appointment_type=models.CharField(max_length = 16,null=True)
    frequency_of_AP_per_2hours=models.IntegerField()
    # start_appointment_date=models.DateField()
   
class Available_time_choices_per_station(models.Model):
    aps_per_station=models.ForeignKey(Appointment_settings_per_station,on_delete=models.CASCADE)
    available_appointment_time=models.TimeField(choices=AVAILABLE_APPOINTMENT_TIME_CHOICES)


class Filled_date_choices_per_station(models.Model):
    '''
    saves  dates with filled appointments as per Filled_date_time_choices_per_station
    '''
    aps_per_station=models.ForeignKey(Appointment_settings_per_station,on_delete=models.CASCADE)
    booked_date=models.DateField()
    


class Filled_date_time_choices_per_station(models.Model):
    '''
    saves time in specific dates with filled appointments as per frequency_of_AP_per_2hours
    '''
    aps_per_station=models.ForeignKey(Appointment_settings_per_station,on_delete=models.CASCADE)
    booked_date=models.DateField()
    booked_time=models.TimeField(choices=AVAILABLE_APPOINTMENT_TIME_CHOICES)
    index_together = ["booked_date", "booked_time"]

class Booked_appointments(models.Model):
    patient_account=models.ForeignKey(User,on_delete=models.CASCADE,related_name='patient_booked_appointments')
    appointment_time=models.TimeField(choices=AVAILABLE_APPOINTMENT_TIME_CHOICES)
    appointment_date=models.DateField()
    doctor_account=models.ForeignKey(User,on_delete=models.CASCADE,related_name='doctor_appointments')
    
   
