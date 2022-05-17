import email
from rest_framework import generics, permissions,status
from .serializer import RegisterSerializer, LoginSerializer, UserSerializer, ProfileSerializer
from knox.models import AuthToken
from rest_framework.response import Response
from .models import Profile, User
import os
from rest_framework.decorators import action
import datetime

# Create your views here.


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'token': AuthToken.objects.create(user)[1],
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
        }, status=201)


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'token': AuthToken.objects.create(user)[1],
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
        })


class ProfileAPI(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProfileSerializer

    def get(self, request):
        queryset = Profile.objects.filter(user=request.user).first()
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(
            data=request.data, instance=request.user, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # User.objects.filter(pk=request.user.id).update(**serializer.validated_data)
        instance = request.user.profile
        if 'image' in request.FILES:
            image = request.FILES['image']
            if instance.image.name != 'default.png':
                prev_path = instance.image.path
                os.remove(prev_path)
            instance.image = request.FILES['image']
            instance.save()
        return Response({
            'user': UserSerializer(User.objects.filter(pk=request.user.id)[0], context=self.get_serializer_context()).data,
            'image': instance.image.url
        })


class CheckEmailApi(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        if request.data and request.data['email']:
            user = User.objects.get(email=request.data['email'])
            if user and user.is_active:
                return Response({
                    'token': AuthToken.objects.create(user)[1],
                })
            else:
                return Response({
                    "error": "no user with such email"
                },status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({
                "error": "no email sent"
            },status=status.HTTP_400_BAD_REQUEST)

class ForgotPassword(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, *args, **kwargs):
        user = request.user
        # u = User.objects.get(id=request.user.id)
        user.set_password(request.data['password'])
        user.save()
        return Response({},status=status.HTTP_200_OK)
class ChangePassword(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def post(self, request, *args, **kwargs):
        user = request.user
        if not user.check_password(request.data['old_password']):
            return Response({
                "error": "failed to enter correct current password"
            },status=status.HTTP_400_BAD_REQUEST)
        # u = User.objects.get(id=request.user.id)
        user.set_password(request.data['new_password'])
        user.save()
        return Response({},status=status.HTTP_200_OK)
