from django.test import TestCase
from accounts.models import User
from accounts.serializer import UserSerializer,RegisterSerializer

class TestSerializers(TestCase):
    def setUp(self):
        self.user_data={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2003-01-01" 
            }
        self.user_data_invalid_empty_username={
            "first_name": "test",
            "last_name":"user",
            "email":"testuser1@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2003-01-01" 
            }
        self.user_data_invalid_reused_username={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2003-01-01" 
            }
        self.user_data_invalid_reused_email={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2003-01-01" 
            }
        self.user_data_invalid_under_18={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2006-01-01" 
            }
        self.user_data_invalid_under_18={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "password": "kamikkkk",
            "email":"testuser@gmail.com",
            "is_patient": False,
            "date_of_birth":"2006-01-01" 
            }
        self.user_data_invalid_empty_password={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "is_patient": False,
            "date_of_birth":"2006-01-01" 
            }
    def test_user_serializer_valid_data(self):
        serializer=RegisterSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())
    def test_user_serializer_validate_data_empty_username(self):
        serializer=RegisterSerializer(data=self.user_data_invalid_empty_username)
        self.assertFalse(serializer.is_valid())
    def test_user_serializer_validate_data_reused_username(self):
        user=User.objects.create(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        serializer=RegisterSerializer(data=self.user_data_invalid_reused_username)
        self.assertFalse(serializer.is_valid())
    def test_user_serializer_validate_data_reused_email(self):
        user=User.objects.create(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        serializer=RegisterSerializer(data=self.user_data_invalid_reused_email)
        self.assertFalse(serializer.is_valid())
    def test_user_serializer_validate_data_under_18(self):
        serializer=RegisterSerializer(data=self.user_data_invalid_under_18)
        self.assertFalse(serializer.is_valid())
    def test_user_serializer_validate_data_empty_password(self):
        serializer=RegisterSerializer(data=self.user_data_invalid_empty_password)
        self.assertFalse(serializer.is_valid())