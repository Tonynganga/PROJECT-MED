from rest_framework import serializers
from accounts.models import User,Profile
from django.contrib.auth import authenticate
import datetime
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','blood_group','phone_number','gender','first_name','last_name','email','is_patient','address']
class RegisterSerializer(serializers.ModelSerializer): 
    class Meta:
        model=User
        fields=['username','first_name','last_name','email','password','is_patient','is_doctor','date_of_birth']
    def validate_date_of_birth(self,value):
        year = datetime.date.today().year
        year_of_birth=value.year
        if(year-year_of_birth)<18:
            raise serializers.ValidationError("User should be above 18")
        return value        
    def validate_email(self,value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email exists")
        return value
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
            date_of_birth=validated_data['date_of_birth'],
            is_patient=patient,
            is_doctor=doctor
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
# class LoginSerializer(serializers.Serializer):
#     username=serializers.CharField()
#     password=serializers.CharField()
#     def validate(self,data):
#         if User.objects.filter(username=data['username']).exists():
#             user=authenticate(**data)
#             if not user:
#                 raise serializers.ValidationError("Incorrect Credentials")                
#             return user
#         raise serializers.ValidationError("user does not exist")

class ProfileSerializer(serializers.ModelSerializer):
    user=UserSerializer()
    class Meta:
        model=Profile
        fields=['user','image']