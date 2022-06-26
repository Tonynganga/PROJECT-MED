from django.test import TestCase,Client
from django.urls import reverse
from blog.models import Blogs
from accounts.models import User
import json

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
            is_doctor=True,
            date_of_birth="2005-01-01" 
        )
        self.blog=Blogs.objects.create( 
            blogger_account=self.user,
            category="general",
           blog_title="common cold2",
           blog_content="never had it2"
        )
        self.login_res=json.loads(self.client.post(reverse('login'),json.dumps({
            "username": "testuser","password": "kamikkkk"
            }),content_type="application/json").content.decode("UTF-8"))
    def test_blog_api_create(self):
        response=self.client.post(reverse('post_blog'),json.dumps({            
           "blog_title":"common cold3",
           "category":"general",
           "blog_content":"never had it3"
        }),content_type="application/json",HTTP_AUTHORIZATION="Token "+self.login_res['token'])
        self.assertEqual(response.status_code,201)
    def test_blog_api_get(self):
        response=self.client.get(reverse('get_blogs'))
        self.assertEqual(response.status_code,200)
    def test_blog_api_update(self):
        response=self.client.put(reverse('update_blog',args=(self.blog.id,)),json.dumps({            
           "blog_title":"common cold",
           "category":"general",
           "blog_content":"never had it2"
        }),content_type="application/json",HTTP_AUTHORIZATION="Token "+self.login_res['token'])
        self.assertEqual(response.status_code,204)
        # self.assertNotEqual(self.blog.blog_title)
    def test_blog_api_delete(self):
        response=self.client.delete(reverse('delete_blog',args=(self.blog.id,)),HTTP_AUTHORIZATION="Token "+self.login_res['token'])
        self.assertEqual(response.status_code,204)
        