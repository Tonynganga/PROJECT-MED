import json
from django.test import TestCase,Client
from django.urls import reverse
from reviews.models import Reviews
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
        self.user=User.objects.create_user(
            username= "testuser2",
            first_name= "test",
            last_name= "user2",
            email= "testuser2@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        self.res=json.loads(self.client.post(reverse('login'),json.dumps({
            "username": "testuser","password": "kamikkkk"
            }),content_type="application/json").content.decode("UTF-8"))
        self.res2=json.loads(self.client.post(reverse('login'),json.dumps({
            "username": "testuser2","password": "kamikkkk"
            }),content_type="application/json").content.decode("UTF-8"))
        self.client.post(reverse('post_reviews'),{
            "star":2,
            "message":"there is no frontend",
        },HTTP_AUTHORIZATION="Token "+self.res2['token'])
        
    def test_post_reviews(self):
        response=self.client.post(reverse('post_reviews'),{
            "star":2,
            "message":"there is no frontend",
        },HTTP_AUTHORIZATION="Token "+self.res['token'])
        self.assertEqual(response.status_code,201)
    def test_get_reviews(self):
        response=self.client.get(reverse('get_reviews'))
        self.assertEqual(response.status_code,200)
    def test_update_review(self):
        response=self.client.put(reverse('update_review'),{
            "star":"3",
            "message":"the frontend",
        },content_type="application/json",HTTP_AUTHORIZATION="Token "+self.res2['token'])
        self.assertEqual(response.status_code,200)