from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blog

class Blog_serializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields=['blogger_account','blog_title','blog_content']
