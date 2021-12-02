from rest_framework import serializers
from accounts.models import User
from django.contrib.auth import authenticate
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','is_patient']
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','first_name','last_name','email','password','is_patient','is_doctor']
    def create(self, validated_data):
        if validated_data['is_patient']==True:
            patient=True
            doctor=False
        else:
            patient=False
            doctor=True
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_patient=patient,
            is_doctor=doctor
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()
    def validate(self,data):
        user=authenticate(**data)
        if not user:
            raise serializers.ValidationError("no user")
            return
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")