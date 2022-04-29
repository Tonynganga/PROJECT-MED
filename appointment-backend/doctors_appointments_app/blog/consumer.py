import json
from channels.generic.websocket import WebsocketConsumer
from yaml import serialize
from django.utils.datastructures import MultiValueDictKeyError
from .serializer import Blog_serializer,Comment_serializer,Comments_for_comments_serializer
from rest_framework import serializers
from .models import Blogs
from asgiref.sync import async_to_sync
from django.http import QueryDict


class BlogsConsumer(WebsocketConsumer):    
    def connect(self):
        self.room_group_name='blog'        
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        self.accept()
        self.send_json({'type':'connected'})
    def receive(self, text_data):
        # print(text_data)
        # data=QueryDict(text_data)
        # print(text_data)
        data = json.loads(text_data)
        self.commands[data["command"]](self,data["data"])
    def send_json(self, message):
        self.send(text_data=json.dumps(message))
    def disconnect(self, close_code):
        # leave group room
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
    def get_blogs(self,data):
        serializer =Blog_serializer(Blogs.objects.all(), many=True)
        self.send_json({'type':'get_blogs','data':serializer.data})
    def add_blog(self, data):
        instance = Blogs.objects.get(id=data["id"])
        serializer = Blog_serializer(instance,many=False)
        self.send_to_group({'type':'update_for_added_blog','data':serializer.data},"send_message")
    def update_blog(self,data):
        print("hello")
        instance = Blogs.objects.get(id=data["id"])
        serializer = Blog_serializer(instance,many=False)
        self.send_to_group({'type':'update_blog','data':serializer.data},"send_message")
    def send_to_group(self,data,type):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': type,
                'data': data
            }
        )
    def delete_blog(self,data):
        self.send_to_group({'type':'delete_blog',"id":data['id']},'send_message')
    def send_message(self, event):
        self.send_json(event['data'])
    
    commands = {
        'get_blogs': get_blogs,
        'add_blog': add_blog,
        'update_blog': update_blog,
        'delete_blog': delete_blog,
    }
    
    