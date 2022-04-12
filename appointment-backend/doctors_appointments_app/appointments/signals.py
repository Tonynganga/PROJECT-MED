from django.db.models.signals import post_save
from .models import Booked_appointments,Filled_date_time_choices_per_station,Available_time_choices_per_station,Filled_date_choices_per_station
from django.dispatch import receiver



@receiver(post_save,sender=Booked_appointments)
def check_if_dates_time_filled(sender,instance,created,**kwargs):
    '''
    used to check and save both filled out dates and time at specific dates
    '''
    #check time filled
    queryset=Booked_appointments.objects.filter(doctor_account=instance.doctor_account,appointment_time=instance.appointment_time,appointment_date=instance.appointment_date)
    required_length=instance.doctor_account.aps_per_station.frequency_of_AP_per_2hours
    if required_length<=len(queryset):
        Filled_date_time_choices_per_station.objects.create(aps_per_station=instance.doctor_account.aps_per_station,booked_date=instance.appointment_date,booked_time=instance.appointment_time)

    #check date filled  
    available_time_queryset=Available_time_choices_per_station.objects.filter(aps_per_station=instance.doctor_account.aps_per_station)
    filled_time_queryset=Filled_date_time_choices_per_station.objects.filter(booked_date=instance.appointment_date)
    if len(available_time_queryset)==len(filled_time_queryset):
        Filled_date_choices_per_station.objects.create(aps_per_station=instance.doctor_account.aps_per_station,booked_date=instance.appointment_date)








