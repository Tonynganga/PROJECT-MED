import json
from django.test import TestCase,Client
from channels.testing import WebsocketCommunicator
from blog.consumer import BlogsConsumer,CommentsConsumer
from accounts.models import User
from django.urls import reverse
from blog.models import Blogs,Comments,Comments_for_comments
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

class MyTests(TestCase):
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
           blog_title="common cold",
           category="general",
           blog_content="never had it"
        )
        self.blog1=Blogs.objects.create(blogger_account=self.user,
           blog_title="common cold3",
           category="general",
           blog_content="never had it3")
        self.blog_data={
           "blog_title":"common cold2",
           "category":"general",
           'blog_content':"never had it2"
        }
        self.comment=Comments.objects.create( 
            commentor_account=self.user,
            blog=self.blog,
           comment="sleep it off",
        )
        self.login_res=json.loads(self.client.post(reverse('login'),json.dumps({
            "username": "testuser","password": "kamikkkk"
            }),content_type="application/json").content.decode("UTF-8"))
        
    async def test_blog_consumer_connection(self):
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")
        connected, subprotocol = await communicator.connect()
        self.assertTrue(connected)
        await communicator.disconnect() 

    async def test_blog_consumer_get_blogs(self):
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")  
        await communicator.connect()   
        await communicator.receive_json_from() 
        await communicator.send_json_to({'command': 'get_blogs',
                    'data': {
                    }})
        response = await communicator.receive_json_from()
        self.assertEquals(response['data'][0]['blog_title'],'common cold')
        await communicator.disconnect() 
        # response=sync_to_async(self.client.post)(reverse('post_blog'),json.dumps({            
        #    "blog_title":"common cold3",
        #    "blog_content":"never had it3"
        # }),content_type="apaddBlogplication/json",HTTP_AUTHORIZATION="Token "+self.login_res['token'])        
    async def test_blog_consumer_add_blog(self):
        '''
        database operations performed before communicator operations to work in async 
        (don't know why)
        '''
        blog=await database_sync_to_async(Blogs.objects.create)(blogger_account=self.user,
           blog_title="common cold5",
           category="general",
           blog_content="never had it5")
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")
        await communicator.connect()
        await communicator.receive_json_from()
        await communicator.send_json_to({'command': 'add_blog',
                    'data': {'id':blog.id}})
        response = await communicator.receive_json_from()
        self.assertEquals(response['data']['blog_title'],'common cold5')
        await communicator.disconnect() 
    async def test_blog_consumer_update_blog(self):
        blog=await database_sync_to_async(Blogs.objects.get)(id=self.blog1.id)
        blog.blog_title='common cold4'
        await database_sync_to_async( blog.save)()
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")
        await communicator.connect()
        await communicator.receive_json_from()        
        await communicator.send_json_to({'command': 'update_blog',
                    'data': {'id':self.blog1.id}})
        response = await communicator.receive_json_from()
        self.assertEquals(response['data']['blog_title'],'common cold4')
        await communicator.disconnect() 
    async def test_blog_consumer_delete_blog(self):
        id=self.blog1.id
        blog=await database_sync_to_async(Blogs.objects.get)(id=id)
        await database_sync_to_async(blog.delete)()
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")
        await communicator.connect()
        await communicator.receive_json_from()        
        await communicator.send_json_to({'command': 'delete_blog',
                    'data': {'id':id}})
        response = await communicator.receive_json_from()
        self.assertEquals(response['id'],id)
    
    async def test_blog_consumer_connection(self):
        communicator = WebsocketCommunicator(BlogsConsumer.as_asgi(), "")
        connected, subprotocol = await communicator.connect()
        self.assertTrue(connected)
        await communicator.disconnect() 