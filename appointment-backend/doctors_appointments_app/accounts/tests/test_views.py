
import json
from django.test import TestCase,Client
from django.urls import reverse
from accounts.models import User

class TestViews(TestCase):
    def setUp(self):
        self.client=Client()
        self.user=User.objects.create_user(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        
    def test_register_api(self):
        response=self.client.post(reverse('register'),{
            "username": "testuser1",
            "first_name": "test",
            "last_name":"user1",
            "email":"testuser1@gmail.com",
            "password": "kamikkkk", 
            "is_patient": False,
            "date_of_birth":"2003-01-01" 
        })
        self.assertEqual(response.status_code,201)
    def test_login_api(self):
        response=self.client.post(reverse('login'),{
            "username": "testuser","password": "kamikkkk"
            })
        self.assertEqual(response.status_code,200)
    def test_logout_api(self):
        res=self.client.post(reverse('login'),{
            "username": "testuser","password": "kamikkkk"
            })
        res=json.loads(res.content.decode("UTF-8"))
        logout_res=self.client.post(reverse('knox_logout'),HTTP_AUTHORIZATION="Token "+res['token'])
        self.assertEqual(logout_res.status_code,204)
    def test_profile_api(self):
        res=self.client.post(reverse('login'),{
            "username": "testuser","password": "kamikkkk"
            })
        res=json.loads(res.content.decode("UTF-8"))
        profile_res=self.client.get(reverse('profile'),HTTP_AUTHORIZATION="Token "+res['token'])
        self.assertEqual(profile_res.status_code,200)