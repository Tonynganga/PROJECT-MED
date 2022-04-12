from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blogs,Comments

class Blog_serializer(serializers.ModelSerializer):
    blogger_profile_pic=serializers.URLField(source='blogger_account.profile.image.url')
    blogger_first_name=serializers.CharField(source='blogger_account.first_name')
    blogger_last_name=serializers.CharField(source='blogger_account.last_name')
    class Meta:
        model=Blogs
        fields=['id','blog_title','blog_content','excerpt','date_posted','thumbnail','blogger_profile_pic','blogger_first_name','blogger_last_name']
        read_only_fields=['id','date_posted','thumbnail']
    
class Comment_serializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['id','blog','comment']
        read_only_fields=['id']
