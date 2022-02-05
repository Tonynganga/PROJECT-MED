from django.db import models
import datetime
from accounts.models import User

# Create your models here.

AT_8AM=datetime.time(8,00)
AT_10AM=datetime.time(10,00)
AT_12AM=datetime.time(12,00)
AT_2PM=datetime.time(14,00)
AT_4PM=datetime.time(16,00)

AVAILABLE_APPOINTMENT_TIME_CHOICES=(
    (AT_8AM,"08:00"),
    (AT_10AM,"10:00"),
    (AT_12AM,"12:00"),
    (AT_2PM,"14:00"),
    (AT_4PM,"16:00")
)
    

class Appointments(models.Model):    
    doctor_account=models.OneToOneField(User,on_delete=models.CASCADE)
    set_available_time_choices=models.TimeField()
    frequency_of_AP_per_2hours=models.IntegerField()

class Booked_appointments(models.Model):
    patient_account=models.ForeignKey(User,on_delete=models.CASCADE,related_name='patient_booked_appointments')
    appointment_time=models.TimeField()
    appointment_date=models.DateField()
    doctor_account=models.ForeignKey(User,on_delete=models.CASCADE)

    
    
    
