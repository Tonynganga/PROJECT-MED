from functools import partial
from rest_framework import permissions,viewsets,status,serializers
from rest_framework.response import Response
from .serializer import Blog_serializer,Comment_serializer
from .models import Blogs,Comments

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
            serializer.save(blogger_account=request.user,thumbnail=request.FILES['thumbnail'])
        else:
            raise serializers.ValidationError("User should be a doctor")
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class Comment_API(viewsets.ModelViewSet):
    serializer_class=Comment_serializer
    permission_classes=[
        permissions.IsAuthenticated,
    ]
    def get_queryset(self):
        queryset=Comments.objects.all().filter(blog=self.kwargs['blog_id'])
        return queryset
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.initial_data['commentor_account']=request.user.id
        serializer.is_valid(raise_exception=True)
        serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    