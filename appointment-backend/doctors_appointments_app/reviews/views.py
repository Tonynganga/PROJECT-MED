from django.utils.decorators import method_decorator
from rest_framework import viewsets,status,permissions
from rest_framework.decorators import action
from .serializer import Reviews_serializer
from .models import Reviews
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS
# Create your views here.

class Reviews_API(viewsets.ModelViewSet):
    permission_classes=[
        permissions.IsAuthenticated|ReadOnly,
    ]
    serializer_class=Reviews_serializer
    queryset=Reviews.objects.all()
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(reviewer=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    @method_decorator(login_required)
    def retrieve(self, request, *args, **kwargs):
        instance = self.queryset.filter(reviewer=request.user).first()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    def update(self, request, *args, **kwargs):
        instance =self.queryset.filter(reviewer=request.user).first()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)