from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blogs,Comments

class Blog_serializer(serializers.ModelSerializer):
    class Meta:
        model=Blogs
        fields=['id','blogger_account','blog_title','blog_content']
        read_only_fields=['id']
    def validate_blogger_account(self,value):
        if value.is_doctor!=True:
            raise serializers.ValidationError("User should be a doctor")
        return value
class Comment_serializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields=['id','commentor_account','blog','comment']
        read_only_fields=['id']
