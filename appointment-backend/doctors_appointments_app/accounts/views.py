from rest_framework import generics,permissions,viewsets
from .serializer import RegisterSerializer,LoginSerializer,UserSerializer,ProfileSerializer
from knox.models import AuthToken
from rest_framework.response import Response
from .models import Profile,User
import os
from rest_framework.decorators import action
import datetime

# Create your views here.

class RegisterAPI(generics.GenericAPIView):
    serializer_class=RegisterSerializer
    def post(self,request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.save()
        return Response({
            'token':AuthToken.objects.create(user)[1],
            'user':UserSerializer(user,context=self.get_serializer_context()).data,
        })
class LoginAPI(generics.GenericAPIView):
    serializer_class=LoginSerializer
    def post(self,request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data
        return Response({
            'token':AuthToken.objects.create(user)[1],
            'user':UserSerializer(user,context=self.get_serializer_context()).data,
        })
class ProfileAPI(generics.ListCreateAPIView):
    permission_classes=[
        permissions.IsAuthenticated,
    ]
    serializer_class=ProfileSerializer
    def get(self,request):
        queryset = Profile.objects.filter(user=request.user).first()
        serializer=ProfileSerializer(queryset)
        return Response(serializer.data)
    def post(self,request,*args,**kwargs):
        serializer=UserSerializer(data=request.data,instance=request.user,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        # User.objects.filter(pk=request.user.id).update(**serializer.validated_data)
        instance=request.user.profile
        if 'image' in request.FILES:
            image=request.FILES['image']   
            if instance.image.name != 'default.png':
                prev_path=instance.image.path
                os.remove(prev_path)
            instance.image=request.FILES['image']
            instance.save()       
        return Response({
            'user':UserSerializer(User.objects.filter(pk=request.user.id)[0],context=self.get_serializer_context()).data,
            'image':instance.image.url
        })


# class ProfileAPI(viewsets.ModelViewSet):
#     serializer_class = ProfileSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         return Profile.objects.filter(user=self.request.user).first()
#     def list(self,request):
#         queryset = Profile.objects.filter(user=request.user).first()
#         serializer=ProfileSerializer(queryset)
#         return Response(serializer.data)
#     def create(self, request, *args, **kwargs):
#         pass
#     @action(detail=True, methods=['post'])
#     def update_user_profile(self,request):        
#         serializer=UserSerializer(data=request.data,instance=request.user)
#         serializer.is_valid(raise_exception=True)
#         user=serializer.validated_data
#         User.objects.filter(pk=request.user.id).update(**serializer.validated_data)
#         instance=request.user.profile
#         if 'image' in request.FILES:
#             image=request.FILES['image']   
#             if instance.image.name != 'default.png':
#                 prev_path=instance.image.path
#                 os.remove(prev_path)
#             instance.image=request.FILES['image']
#             instance.save()       
#         return Response({
#             'user':UserSerializer(self.request.user,context=self.get_serializer_context()).data,
#             'image':instance.image.url
#         })
class UserAPI(generics.RetrieveAPIView):
    permission_classes=[
        permissions.IsAuthenticated,
    ]
    serializer_class=UserSerializer
    def get_object(self):
        return Response({
            'user':self.request.user
        })