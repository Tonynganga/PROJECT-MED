from rest_framework import generics,permissions,viewsets
from rest_framework.response import Response
from .serializer import Blog_serializer,Comment_serializer
from .models import Blogs,Comments

# Create your views here.
class Blog_API(viewsets.ModelViewSet):
    serializer_class=Blog_serializer
    queryset=Blogs.objects.all()
class Comment_API(viewsets.ModelViewSet):
    serializer_class=Comment_serializer
    queryset=Comments.objects.all()
    