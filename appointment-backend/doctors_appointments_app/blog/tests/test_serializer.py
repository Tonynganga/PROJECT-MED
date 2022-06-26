from django.test import TestCase
from blog.models import Blogs,Comments,Comments_for_comments
from blog.serializer import Blog_serializer,Comment_serializer,Comments_for_comments_serializer
from accounts.models import User

class TestSerializers(TestCase):
    def setUp(self):
        self.user=User.objects.create(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        self.user1=User.objects.create(
            username= "testuser1",
            first_name= "test",
            last_name= "user1",
            email= "testuser1@gmail.com",
            password= "kamikkkk", 
            is_patient= True,
            date_of_birth="2005-01-01" 
        )
        self.blog=Blogs.objects.create( 
            blogger_account=self.user,
            category="general",
           blog_title="common cold",
           blog_content="never had it"
        )
        self.comment=Comments.objects.create( 
            commentor_account=self.user,
            blog=self.blog,
           comment="sleep it off",
        )
        self.blog_data={
            "blogger_account":self.user.id,
            "category":"general",
           "blog_title":"common cold2",
           'blog_content':"never had it2"
        }
        self.comment_data={
            "commentor_account":self.user.id,
            "blog":self.blog.id,
           "comment":"sleep it off2",
        }
        self.comment_for_comment_data={
            "commentor_account":self.user1.id,
            "parent_comment":self.comment.id,
            "from_original":True,
           "comment":"and wake up2",
        }
        self.invalid_blog_data={
            "blogger_account":self.user.id,
           "blog_content":"never had it3"
        }
        self.invalid_comment_data={
            "commentor_account":self.user.id,
           "comment":"sleep it off3",
        }
        self.invalid_comment_for_comment_data={
            "commentor_account":self.user1.id,
            "from_original":True,
           "comment":"and wake up3",
        }
    def test_blog_serializer_valid_data(self):
        serializer=Blog_serializer(data=self.blog_data)
        self.assertTrue(serializer.is_valid(raise_exception=True))
    def test_blog_serializer_invalid_data(self):
        serializer=Blog_serializer(data=self.invalid_blog_data)
        self.assertFalse(serializer.is_valid())
    def test_comment_serializer_valid_data(self):
        serializer=Comment_serializer(data=self.comment_data)
        self.assertTrue(serializer.is_valid())
    def test_comment_serializer_invalid_data(self):
        serializer=Comment_serializer(data=self.invalid_comment_data)
        self.assertFalse(serializer.is_valid())
    def test_comment_for_comment_serializer_valid_data(self):
        serializer=Comments_for_comments_serializer(data=self.comment_for_comment_data)
        self.assertTrue(serializer.is_valid())
    def test_comment_for_comment_serializer_invalid_data(self):
        serializer=Comments_for_comments_serializer(data=self.invalid_comment_for_comment_data)
        self.assertFalse(serializer.is_valid())