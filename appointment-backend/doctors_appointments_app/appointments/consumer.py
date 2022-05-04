import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from click import command
from .models import Booked_appointments
from accounts.models import User
from .serializer import Booked_appointments_Serializer,Patient_Details_For_Booked_appointments_Serializer

class ModifiedWebsocketConsumer(WebsocketConsumer):
    commands=dict()
    room_group_name=""
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data["command"]](self,data["data"])
    def send_to_group(self,data,type):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': type,
                'data': data
            }
        )
        
    def send_message(self, event):
        self.send_json(event['data'])
    def send_json(self, message):
        self.send(text_data=json.dumps(message))
    def disconnect(self, close_code):
        # leave group room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

class BookedAppointmentWebsocketConsumer(ModifiedWebsocketConsumer):
    def connect(self):
        self.room_group_name='booked_appointment'        
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        self.accept()
        self.send_json({'type':'connected'})     
    def get_booked_appointments(self,data):
        queryset = Booked_appointments.objects.all().filter(
            doctor_account=self.scope['user'])
        serializer =Booked_appointments_Serializer(queryset, many=True)
        self.send_json({'type':'get_booked_appointments','data':serializer.data})
    commands={
        "get_booked_appointments":get_booked_appointments,
    }


class PatientDetailsWebsocketConsumer(ModifiedWebsocketConsumer):
    def connect(self):
        self.room_group_name='my_patient_details'        
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        self.accept()
        self.send_json({'type':'connected'})     
    def get_my_patients_details(self,data):
        temp_queryset = Booked_appointments.objects.filter(
            doctor_account=self.scope['user'])
        temp_queryset = temp_queryset.values_list(
            'patient_account', flat=True).distinct()
        queryset = User.objects.none()
        for i in temp_queryset:
            queryset = queryset | User.objects.filter(id=i)
        serializer =Patient_Details_For_Booked_appointments_Serializer(queryset, many=True)
        self.send_json({'type':'get_my_patients_details','data':serializer.data})
    commands={
        "get_my_patients_details":get_my_patients_details,
    }
