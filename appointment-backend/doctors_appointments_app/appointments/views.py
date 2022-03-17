from rest_framework import viewsets,status,permissions
from .serializer import Appointment_settiing_ps_Serializer,Available_time_choice_ps_Serializer,Booked_appointments_Serializer,Get_Available_Appointment_Serializer
from knox.models import AuthToken
from rest_framework.response import Response
from .models import Appointment_settings_per_station,Available_time_choices_per_station,Booked_appointments,Filled_date_time_choices_per_station
from django.shortcuts import get_object_or_404
import os
from rest_framework.decorators import action
import datetime

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

# Create your views here.

class Appointment_setting_ps_API(viewsets.ModelViewSet):
    permission_classes=[
        permissions.IsAuthenticated|ReadOnly,
    ]
    serializer_class=Appointment_settiing_ps_Serializer
    queryset=Appointment_settings_per_station.objects.all()
    lookup_field='doctor_account'
    
    def retrieve(self, request, *args, **kwargs):
        obj = get_object_or_404(self.queryset, **{self.lookup_field:request.user.id})
        # May raise a permission denied
        self.check_object_permissions(self.request, obj)
        serializer = self.get_serializer(obj)
        return Response(serializer.data)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.initial_data['doctor_account']=request.user.id
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    
class Get_available_appointments_API(viewsets.ModelViewSet):
    serializer_class=Get_Available_Appointment_Serializer
    queryset=Appointment_settings_per_station.objects.all()

class Available_time_choice_ps_API(viewsets.ModelViewSet):
    serializer_class=Available_time_choice_ps_Serializer
    queryset=Available_time_choices_per_station.objects.all()    
    def list(self, request, *args, **kwargs):
        self.queryset=Available_time_choices_per_station.objects.filter(aps_per_station=self.kwargs['aps_per_station'])
        return super().list(request, *args, **kwargs)    
    @action(detail=False, methods=['get'])
    def list_for_date(self,request, *args, **kwargs):
        filled_time_queryset=Filled_date_time_choices_per_station.objects.filter(aps_per_station=self.kwargs['aps_per_station'],booked_date=self.kwargs['date'])
        queryset=Available_time_choices_per_station.objects.filter(aps_per_station=self.kwargs['aps_per_station'])
        for item in filled_time_queryset:
            queryset=queryset.exclude(available_appointment_time=item.booked_time)
        self.queryset=queryset
        return super().list(request, *args, **kwargs)
        
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

class Booked_appointments_API(viewsets.ModelViewSet):
        serializer_class=Booked_appointments_Serializer
        def get_queryset(self):
            queryset=Booked_appointments.objects.all().filter(doctor_account=self.kwargs['doctor_account'])
            return queryset

# class Filled_date_choices_ps_API(viewsets.ModelViewSet):
#         serializer_class=Filled_date_choices_ps_Serializer