from rest_framework import viewsets,status,permissions,generics
from .serializer import Reviews_serializer
from .models import Reviews
from rest_framework.response import Response

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