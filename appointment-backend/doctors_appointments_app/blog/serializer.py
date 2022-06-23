from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blogs, Comments, Comments_for_comments


class Blog_serializer(serializers.ModelSerializer):
    blogger_profile_pic = serializers.URLField(
        source='blogger_account.profile.image.url',required=False)
    blogger_first_name = serializers.CharField(
        source='blogger_account.first_name',required=False)
    blogger_last_name = serializers.CharField(
        source='blogger_account.last_name',required=False)
    blogger_username = serializers.CharField(
        source='blogger_account.username',required=False)

    class Meta:
        model = Blogs
        fields = ['id','blog_title', 'blog_content', 'excerpt', 'date_posted', 'thumbnail',
                  'blogger_profile_pic', 'blogger_first_name', 'blogger_last_name', 'blogger_username']
        read_only_fields = ['id', 'date_posted', 'thumbnail','blogger_profile_pic','blogger_first_name', 'blogger_last_name', 'blogger_username']
        


class Comment_serializer(serializers.ModelSerializer):
    commentor_profile_pic = serializers.URLField(
        source='commentor_account.profile.image.url', required=False)
    commentor_first_name = serializers.CharField(
        source='commentor_account.first_name', required=False)
    commentor_last_name = serializers.CharField(
        source='commentor_account.last_name',required=False)
    commentor_username = serializers.CharField(
        source='commentor_account.username', required=False)

    class Meta:
        model = Comments
        fields = ['id','blog', 'comment', 'date_posted', 'commentor_profile_pic',
                  'commentor_first_name', 'commentor_last_name', 'commentor_username']
        read_only_fields = ['id', 'date_posted', 'commentor_profile_pic',
                  'commentor_first_name', 'commentor_last_name', 'commentor_username']


class Comments_for_comments_serializer(serializers.ModelSerializer):
    commentor_profile_pic = serializers.URLField(
        source='commentor_account.profile.image.url',required=False)
    commentor_first_name = serializers.CharField(
        source='commentor_account.first_name',required=False)
    commentor_last_name = serializers.CharField(
        source='commentor_account.last_name',required=False)
    commentor_username = serializers.CharField(
        source='commentor_account.username',required=False)

    class Meta:
        model = Comments_for_comments
        fields = ['id', 'from_original', 'parent_comment', 'comment', 'date_posted',
                  'commentor_profile_pic', 'commentor_first_name', 'commentor_last_name', 'commentor_username']
        read_only_fields = ['id', 'date_posted']
