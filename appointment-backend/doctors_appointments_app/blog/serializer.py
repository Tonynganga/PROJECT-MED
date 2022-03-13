from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blogs,Comments

class Blog_serializer(serializers.ModelSerializer):
    class Meta:
        model=Blogs
        fields=['blogger_account','blog_title','blog_content']
class Comment_serializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['commentor_account','comment']
