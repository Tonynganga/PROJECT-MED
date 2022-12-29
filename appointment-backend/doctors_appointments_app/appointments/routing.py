from django.urls import re_path 
from . import consumer

websocket_urlpatterns = [
    re_path(r"^booked_appointments/", consumer.BookedAppointmentWebsocketConsumer.as_asgi()),
    re_path(r"^my_patient_details/", consumer.PatientDetailsWebsocketConsumer.as_asgi()),
    # re_path(r"^comments/", consumer.CommentsConsumer.as_asgi()),
    # re_path(r"^comments_for_comments/", consumer.CommentsForCommentConsumer.as_asgi())
]