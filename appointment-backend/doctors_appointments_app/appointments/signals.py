from django.db.models.signals import post_save
from .models import Booked_appointments,Filled_date_time_choices_per_station,Available_time_choices_per_station,Filled_date_choices_per_station
from .serializer import Booked_appointments_Serializer,Patient_Details_For_Booked_appointments_Serializer
from accounts.models import User
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync



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

@receiver(post_save,sender=Booked_appointments)
def update_channel_groups(sender,instance,created,**kwargs):
    # update displayed booked appointments
    queryset = Booked_appointments.objects.all().filter(
            doctor_account=instance.doctor_account)
    serializer =Booked_appointments_Serializer(queryset, many=True)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'booked_appointment',
        {'type':'send_message','data':{'type':'get_booked_appointments','data':serializer.data}}
    )

    # update displayed patient detaills
    temp_queryset = Booked_appointments.objects.filter(
        doctor_account=instance.doctor_account)
    temp_queryset = temp_queryset.values_list(
        'patient_account', flat=True).distinct()
    queryset = User.objects.none()
    for i in temp_queryset:
        queryset = queryset | User.objects.filter(id=i)
    serializer =Patient_Details_For_Booked_appointments_Serializer(queryset, many=True)
    async_to_sync(channel_layer.group_send)(
        'my_patient_details',
        {'type':'send_message','data':{'type':'get_my_patients_details','data':serializer.data}}
    )







