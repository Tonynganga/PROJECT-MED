from rest_framework import serializers
from .models import Appointment_settings_per_station,Available_time_choices_per_station,Booked_appointments,Filled_date_time_choices_per_station
from django.contrib.auth import authenticate
import datetime
from django.core.exceptions  import ValidationError
class Appointment_settiing_ps_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment_settings_per_station
        fields=['id','doctor_account','frequency_of_AP_per_2hours','appointment_type']
        read_only_fields=['id']
    def validate_doctor_account(self,value):
        if value.is_doctor!=True:
            raise serializers.ValidationError("User should be a doctor")
        return value
class Get_Available_Appointment_Serializer(serializers.ModelSerializer):
    doctor_first_name = serializers.CharField(source='doctor_account.first_name',required=False)
    doctor_last_name=serializers.CharField(source='doctor_account.last_name',required=False)
    doctor_gender=serializers.CharField(source='doctor_account.gender',required=False)
    doctor_address=serializers.CharField(source='doctor_account.address',required=False)
    doctor_phone_no=serializers.CharField(source='doctor_account.phone_number',required=False)
    doctor_profile_pic=serializers.URLField(source='doctor_account.profile.image.url',required=False)
    class Meta:
        model=Appointment_settings_per_station
        fields=['id','doctor_first_name','doctor_last_name','doctor_address','doctor_phone_no','doctor_gender','appointment_type','doctor_profile_pic']
class Available_time_choice_ps_Serializer(serializers.ModelSerializer):
    class Meta:
        model=Available_time_choices_per_station
        fields=['available_appointment_time']
    def validate_available_appointment_time(self,value):
        try:
            if Available_time_choices_per_station.objects.get(available_appointment_time=value,aps_per_station=self.initial_data['aps_per_station']):
                raise serializers.ValidationError(value+" time already exists in database")
        except Available_time_choices_per_station.DoesNotExist:
            pass
        return value
# class Filled_date_choices_ps_Serializer(serializers.ModelSerializer):
#     class Meta:
#         model=Filled_date_choices_per_station
#         fields=["aps_per_station","fully_booked_dates"]
class Booked_appointments_Serializer(serializers.ModelSerializer):
    patient_first_name=serializers.CharField(source='patient_account.first_name',required=False)
    patient_last_name=serializers.CharField(source='patient_account.last_name',required=False)
    patient_email=serializers.CharField(source='patient_account.email',required=False)
    patient_phone_no=serializers.CharField(source='patient_account.phone_number',required=False)
    patient_profile_pic=serializers.URLField(source='patient_account.profile.image.url',required=False)    
    class Meta:
        model=Booked_appointments
        fields=['id',"appointment_time","appointment_date",'patient_first_name','patient_last_name','patient_email','patient_phone_no','patient_profile_pic']
        read_only_fields=['id','patient_first_name','patient_last_name','patient_phone_no','patient_profile_pic','patient_email']
    # def validate_doctor_account(self,value):
    #     if value.is_doctor!=True:
    #         raise serializers.ValidationError("Enter a valid doctor account")
    #     try:    
    #         if value.aps_per_station is not None:
    #             pass
    #     except Appointment_settings_per_station.DoesNotExist:
    #         raise serializers.ValidationError("doctor_account must have Appointment_settings_per_station instance ")    
    #     return value
    
    def validate_appointment_date(self,value):
        today_date = datetime.date.today()
        if today_date>value:
            raise serializers.ValidationError("appointments are made after today")
        return value

    def validate_appointment_time(self,value):
        try:
            if Filled_date_time_choices_per_station.objects.get(booked_date=self.initial_data['appointment_date'],booked_time=value):
                raise serializers.ValidationError(value+" time is fully booked for "+self.initial_data['appointment_date'])       
        except Filled_date_time_choices_per_station.DoesNotExist:
            pass
        return value
    