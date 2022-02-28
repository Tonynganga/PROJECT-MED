from rest_framework import generics,permissions,viewsets,status
from .serializer import Appointment_settiing_ps_Serializer,Available_time_choice_ps_Serializer,Booked_appointments_Serializer
from knox.models import AuthToken
from rest_framework.response import Response
from .models import Appointment_settings_per_station,Available_time_choices_per_station,Booked_appointments,Filled_date_time_choices_per_station
from django.shortcuts import get_object_or_404
import os
from rest_framework.decorators import action
import datetime

# Create your views here.

class Appointment_setting_ps_API(viewsets.ModelViewSet):
    serializer_class=Appointment_settiing_ps_Serializer
    queryset=Appointment_settings_per_station.objects.all()

class Available_time_choice_ps_API(viewsets.ModelViewSet):
    serializer_class=Available_time_choice_ps_Serializer
    def get_queryset(self):
        filled_time_queryset=Filled_date_time_choices_per_station.objects.filter(aps_per_station=self.kwargs['aps_per_station'],booked_date=self.kwargs['date'])
        print(len(filled_time_queryset))
        queryset=Available_time_choices_per_station.objects.filter(aps_per_station=self.kwargs['aps_per_station'])
        for item in filled_time_queryset:
            queryset=queryset.exclude(available_appointment_time=item.booked_time)
        return queryset
    @action(detail=False, methods=['post'])
    def create_from_list(self, request):
        serializer_list=[]
        data_list=[]
        aps_per_station=request.data['aps_per_station']
        available_appointment_time_list=request.data['available_appointment_time']
        for time in available_appointment_time_list:
            data={"aps_per_station":aps_per_station,"available_appointment_time":time}    
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer_list.append(serializer)
        for item in serializer_list:
            self.perform_create(item)
            headers = self.get_success_headers(item.data)
            data_list.append(item.data)
        return Response(data_list, status=status.HTTP_201_CREATED, headers=headers)

'''TODO add validations '''
class Booked_appointments_API(viewsets.ModelViewSet):
        serializer_class=Booked_appointments_Serializer
        def get_queryset(self):
            queryset=Booked_appointments.objects.all().filter(doctor_account=self.kwargs['doctor_account'])
            return queryset

# class Filled_date_choices_ps_API(viewsets.ModelViewSet):
#         serializer_class=Filled_date_choices_ps_Serializer