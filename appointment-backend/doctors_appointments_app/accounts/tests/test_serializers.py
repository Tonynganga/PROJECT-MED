from django.test import TestCase
from accounts.models import User
from accounts.serializer import UserSerializer

class TestSerializers(TestCase):
    def setUp(self):
        self.user_data={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user",
            "email":"testuser@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2005-01-01" 
            }
        self.user_data_invalid_empty_username={
            "first_name": "test",
            "last_name":"user1",
            "email":"testuser1@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2005-01-01" 
            }
        self.user_data_invalid_reused_username={
            "username": "testuser",
            "first_name": "test",
            "last_name":"user2",
            "email":"testuser2@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2005-01-01" 
            }
        # self.user_invalid1=User.objects.create(            
        #     first_name= "test",
        #     last_name= "user1",
        #     email= "testuser1@gmail.com",
        #     password= "kamikkkk", 
        #     is_patient= False,
        #     date_of_birth="2005-01-01" 
        # )
    def test_user_serializer_valid_data(self):
        serializer=UserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())
    def test_user_serializer_valid_data_invalid1(self):
        serializer=UserSerializer(data=self.user_data_invalid_empty_username)
        self.assertFalse(serializer.is_valid())
    def test_user_serializer_valid_data_invalid2(self):
        self.user=User.objects.create(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        serializer=UserSerializer(data=self.user_data_invalid_reused_username)
        self.assertFalse(serializer.is_valid())