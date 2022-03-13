from rest_framework import generics,permissions,viewsets
from rest_framework.response import Response
from .serializer import Blog_serializer
from .models import Blog

# Create your views here.
class Blog_API(viewsets.ModelViewSet):
    serializer_class=Blog_serializer
    queryset=Blog.objects.all()
    