import json
from channels.generic.websocket import WebsocketConsumer
from click import command
from yaml import serialize
from django.utils.datastructures import MultiValueDictKeyError
from .serializer import Blog_serializer,Comment_serializer,Comments_for_comments_serializer
from rest_framework import serializers
from .models import Blogs,Comments,Comments_for_comments
from asgiref.sync import async_to_sync
from django.http import QueryDict

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

class BlogsConsumer(ModifiedWebsocketConsumer):    
    def connect(self):
        self.room_group_name='blog'        
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        self.accept()
        self.send_json({'type':'connected'})   
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
    def delete_blog(self,data):
        self.send_to_group({'type':'delete_blog',"id":data['id']},'send_message')   
    commands = {
        'get_blogs': get_blogs,
        'add_blog': add_blog,
        'update_blog': update_blog,
        'delete_blog': delete_blog,
    }


class CommentsConsumer(ModifiedWebsocketConsumer):
    def connect(self):
        self.room_group_name='comments'   
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        self.accept()        
        self.send_json({'type':'connected'})    
    def get_comments(self,data):
        queryset=Comments.objects.all().filter(blog=data["blog_id"])
        serializer =Comment_serializer(queryset, many=True)
        self.send_json({'type':'get_comments','data':serializer.data})
    def add_comment(self,data):
        serializer = Comment_serializer(data=data,partial=True)
        if not serializer.is_valid(raise_exception=True):
            self.send_json({'type':'error','data':{'detail':'invalid comment'}})
            return
        serializer.save(commentor_account=self.scope['user'])
        self.send_to_group({'type':'add_comment','room_id':self.room_group_name,"data":serializer.data},'send_message')
    def update_comment(self,data):
        instance = Comments.objects.get(pk=data['id'])
        if instance.commentor_account!=self.scope['user']:
            self.send_json({'type':'error','data':{"detail":"Unauthorized user"}})
            return 
        serializer = Comment_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.send_to_group({'type':'update_comment','room_id':self.room_group_name,'data':serializer.data},"send_message")      
    def delete_comment(self,data):
        instance = Comments.objects.get(pk=data['id'])
        if instance.commentor_account!=self.scope['user']:
           self.send_json({'type':'error','data':{"detail":"Unauthorized user"}})
           return 
        instance.delete()
        self.send_to_group({'type':'delete_comment','room_id':self.room_group_name,"id":data['id']},'send_message')
    def add_comment(self,data):
        serializer = Comment_serializer(data=data,partial=True)
        if not serializer.is_valid(raise_exception=True):
            self.send_json({'type':'error','data':{'detail':'invalid comment'}})
            return
        serializer.save(commentor_account=self.scope['user'])
        self.send_to_group({'type':'add_comment','room_id':self.room_group_name,"data":serializer.data},'send_message')
    def receive(self, text_data):
        data = json.loads(text_data)
        self.room_group_name=data["room_id"]
        self.commands[data["command"]](self,data["data"])
    def get_comments_for_comments(self,data):        
        async_to_sync(self.channel_layer.group_add)(self.room_group_name,self.channel_name)
        if data["from_original"]:
            queryset =Comments_for_comments.objects.all().filter(from_original=True,parent_comment=data['comment_id'])
        else:
            queryset=Comments_for_comments.objects.all().filter(from_original=False,parent_comment=data['comment_id'])
        serializer = Comments_for_comments_serializer(queryset, many=True)
        self.send_json({'type':'get_comments_for_comments','room_id':self.room_group_name,'data':serializer.data})
    def add_comment_for_comment(self,data):
        serializer = Comments_for_comments_serializer(data=data,partial=True)
        if not serializer.is_valid(raise_exception=True):
            self.send_json({'type':'error','data':{'detail':'invalid comment'}})
            return
        serializer.save(commentor_account=self.scope['user'])
        self.send_to_group({'type':'add_comment_for_comment','room_id':self.room_group_name,"data":serializer.data},'send_message')
    def update_comment_for_comment(self,data):
        instance = Comments_for_comments.objects.get(pk=data['id'])
        if instance.commentor_account!=self.scope['user']:
            self.send_json({'type':'error','data':{"detail":"Unauthorized user"}})
            return 
        serializer = Comments_for_comments_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.send_to_group({'type':'update_comment_for_comment','room_id':self.room_group_name,'data':serializer.data},"send_message")
    def delete_comment_for_comment(self,data):
        instance = Comments_for_comments.objects.get(pk=data['id'])
        if instance.commentor_account!=self.scope['user']:
           self.send_json({'type':'error','data':{"detail":"Unauthorized user"}})
           return 
        instance.delete()
        self.send_to_group({'type':'delete_comment_for_comment','room_id':self.room_group_name,"id":data['id']},'send_message')
    def remove_from_group(self,data):
        # leave group room
        return super().disconnect(None)
    def disconnect(self, close_code):
        self.room_group_name='comments'
        return super().disconnect(close_code)
    commands = {
        'get_comments': get_comments,
        'add_comment': add_comment,
        'update_comment': update_comment,
        'delete_comment': delete_comment,
        'get_comments_for_comments': get_comments_for_comments,
        'add_comment_for_comment': add_comment_for_comment,
        'update_comment_for_comment': update_comment_for_comment,
        'delete_comment_for_comment': delete_comment_for_comment,
        'remove_from_group':remove_from_group,
    }

