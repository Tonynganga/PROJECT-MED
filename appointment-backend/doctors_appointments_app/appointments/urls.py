from django.urls import path
from .views import Appointment_setting_ps_API,Available_time_choice_ps_API,Booked_appointments_API,Get_available_appointments_API


urlpatterns = [    
    path('appointment/add_settings',Appointment_setting_ps_API.as_view({'post':'create'})),
    path('appointment/get_setting',Appointment_setting_ps_API.as_view({'get':'retrieve'})),
    path('appointment/get_settings',Appointment_setting_ps_API.as_view({'get':'list'})),
    path('appointment/available_appointments',Get_available_appointments_API.as_view({'get':'list'})),
    path('appointment/get_appointment_time/<int:aps_per_station>/<str:date>',Available_time_choice_ps_API.as_view({'get':'list_for_date'})),
    path('appointment/get_appointment_time/<int:aps_per_station>',Available_time_choice_ps_API.as_view({'get':'list'})),
    path('appointment/set_appointment_time',Available_time_choice_ps_API.as_view({'post':'create'})),
    path('appointment/set_appointment_time_list',Available_time_choice_ps_API.as_view({'post':'create_from_list'})),
    path('appointment/add_booked_appointments',Booked_appointments_API.as_view({'post':'create'})),
    path('appointment/get_booked_appointments/<int:doctor_account>',Booked_appointments_API.as_view({'get':'list'})),
    
]