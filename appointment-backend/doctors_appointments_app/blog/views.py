from functools import partial
from rest_framework import permissions,viewsets,status,serializers
from rest_framework.response import Response
from .serializer import Blog_serializer,Comment_serializer,Comments_for_comments_serializer
from .models import Blogs,Comments,Comments_for_comments
from rest_framework.decorators import action
from django.utils.datastructures import MultiValueDictKeyError

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS



# Create your views here.
class Blog_API(viewsets.ModelViewSet):
    permission_classes=[
        permissions.IsAuthenticated|ReadOnly,
    ]
    serializer_class=Blog_serializer
    queryset=Blogs.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,partial=True)
        if request.user.is_doctor:
            serializer.is_valid(raise_exception=True)
            try:
                serializer.save(blogger_account=request.user,thumbnail=request.FILES['thumbnail'])
            except MultiValueDictKeyError:
                serializer.save(blogger_account=request.user)
        else:
            raise serializers.ValidationError("User should be a doctor")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED, headers=headers)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.blogger_account!=request.user:
           return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.blogger_account!=request.user:
           return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save(thumbnail=request.FILES['thumbnail'])
        except MultiValueDictKeyError:
            serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

        
# class Comment_API(viewsets.ModelViewSet):
#     serializer_class=Comment_serializer
#     permission_classes=[
#         permissions.IsAuthenticated|ReadOnly,
#     ]
#     def get_queryset(self):
#         queryset=Comments.objects.all().filter(blog=self.kwargs['blog_id'])
#         return queryset
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data,partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save(commentor_account=request.user)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#     def update(self, request, *args, **kwargs):
#         instance = Comments.objects.get(pk=self.kwargs['pk'])
#         if instance.commentor_account!=request.user:
#            return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
#         serializer = self.get_serializer(instance, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)
#     def destroy(self, request, *args, **kwargs):
#         instance = Comments.objects.get(pk=self.kwargs['pk'])
#         if instance.commentor_account!=request.user:
#            return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
#         self.perform_destroy(instance)
#         return Response(status=status.HTTP_204_NO_CONTENT)
# class Comments_for_comments_API(viewsets.ModelViewSet):
#     serializer_class=Comments_for_comments_serializer
#     permission_classes=[
#         permissions.IsAuthenticated|ReadOnly,
#     ]
#     def get_queryset(self):
#         queryset=Comments_for_comments.objects.all().filter(from_original=False,parent_comment=self.kwargs['comment_id'])
#         return queryset
#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data,partial=True)
#         serializer.is_valid(raise_exception=True)
#         serializer.save(commentor_account=request.user)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
#     @action(detail=False, methods=['get'])
#     def list_from_original(self, request, *args, **kwargs):
#         queryset =Comments_for_comments.objects.all().filter(from_original=True,parent_comment=self.kwargs['comment_id'])
#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             return self.get_paginated_response(serializer.data)

#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)
#     def update(self, request, *args, **kwargs):
#         instance = Comments_for_comments.objects.get(pk=self.kwargs['pk'])
#         if instance.commentor_account!=request.user:
#            return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
#         serializer = self.get_serializer(instance, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#         return Response(serializer.data)
#     def destroy(self, request, *args, **kwargs):
#         instance = Comments_for_comments.objects.get(pk=self.kwargs['pk'])
#         if instance.commentor_account!=request.user:
#            return Response({"detail":"Unauthorized user"},status=status.HTTP_401_UNAUTHORIZED)
#         self.perform_destroy(instance)
#         return Response(status=status.HTTP_204_NO_CONTENT)
    