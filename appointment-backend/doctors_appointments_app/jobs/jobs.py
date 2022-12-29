from django.conf import settings
from appointments.models import Booked_appointments
from datetime import date,timedelta
import json 

def schedule_job():
    # objects=Booked_appointments.objects.filter(appointment_date__lte=(date.today()-timedelta(days = 1)))
    # objects.delete()
    # for i in objects:
    #     print(i.appointment_date,"hello")
    pass