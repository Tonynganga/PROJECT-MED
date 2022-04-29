from dataclasses import Field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Blogs, Comments, Comments_for_comments


class Blog_serializer(serializers.ModelSerializer):
    blogger_profile_pic = serializers.URLField(
        source='blogger_account.profile.image.url', read_only=True)
    blogger_first_name = serializers.CharField(
        source='blogger_account.first_name', read_only=True)
    blogger_last_name = serializers.CharField(
        source='blogger_account.last_name', read_only=True)
    blogger_username = serializers.CharField(
        source='blogger_account.username', read_only=True)

    class Meta:
        model = Blogs
        fields = ['id', 'blog_title', 'blog_content', 'excerpt', 'date_posted', 'thumbnail',
                  'blogger_profile_pic', 'blogger_first_name', 'blogger_last_name', 'blogger_username']
        read_only_fields = ['id', 'date_posted', 'thumbnail']


class Comment_serializer(serializers.ModelSerializer):
    commentor_profile_pic = serializers.URLField(
        source='commentor_account.profile.image.url', read_only=True)
    commentor_first_name = serializers.CharField(
        source='commentor_account.first_name', read_only=True)
    commentor_last_name = serializers.CharField(
        source='commentor_account.last_name', read_only=True)
    commentor_username = serializers.CharField(
        source='commentor_account.username', read_only=True)

    class Meta:
        model = Comments
        fields = ['id', 'blog', 'comment', 'date_posted', 'commentor_profile_pic',
                  'commentor_first_name', 'commentor_last_name', 'commentor_username']
        read_only_fields = ['id', 'date_posted']


class Comments_for_comments_serializer(serializers.ModelSerializer):
    commentor_profile_pic = serializers.URLField(
        source='commentor_account.profile.image.url')
    commentor_first_name = serializers.CharField(
        source='commentor_account.first_name')
    commentor_last_name = serializers.CharField(
        source='commentor_account.last_name')
    commentor_username = serializers.CharField(
        source='commentor_account.username')

    class Meta:
        model = Comments_for_comments
        fields = ['id', 'from_original', 'parent_comment', 'comment', 'date_posted',
                  'commentor_profile_pic', 'commentor_first_name', 'commentor_last_name', 'commentor_username']
        read_only_fields = ['id', 'date_posted']
