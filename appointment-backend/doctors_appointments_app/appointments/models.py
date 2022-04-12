from django.db import models
import datetime
from accounts.models import User
from django.core.exceptions  import ValidationError

# Create your models here.

AT_7AM="07:00:00"
AT_9AM="09:00:00"
AT_11AM="11:00:00"
AT_1PM="13:00:00"
AT_3PM="15:00:00"

AVAILABLE_APPOINTMENT_TIME_CHOICES=(
    (AT_7AM,"07hours"),
    (AT_9AM,"09hours"),
    (AT_11AM,"11hours"),
    (AT_1PM,"13hours"),
    (AT_3PM,"15hours"),
)

class Appointment_choices(models.TextChoices):
    GENERAL_PRACTITIONER='general practitioner'
    PODIATRIS= 'podiatrist'
    PEDITRICIAN="peditrician"
    ENDOCRINOLOGIST="endocrinologist" 
    NEUROLOGIST="neurologist" 
    RHEUMATOLOGIST="rheumatologist" 
    ALLERGIST="allergist" 
    PSYCHIATRIST="psychiatrist" 
    NEPHROLOGIST="nephrologist" 
    SURGEON="surgeon" 
    ONCOLOGIST="oncologist" 
    DERMATOLOGIST="dermatologist"
    RADIOLOGIST="radiologist"
    CARDIOLOGIST= "cardiologist" 
    DENTIST= "dentist"



class Appointment_settings_per_station(models.Model): 
    '''
    save appointment settings saved by a doctor for their account
    '''   
    doctor_account=models.OneToOneField(User,on_delete=models.CASCADE,related_name='aps_per_station')
    appointment_type=models.CharField(max_length = 25,null=True,choices=Appointment_choices.choices)
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
    
   
