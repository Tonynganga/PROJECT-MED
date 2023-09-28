from django.test import TestCase
from blog.models import Blogs,Comments,Comments_for_comments
from accounts.models import User

class TestModels(TestCase):
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
        self.comment_for_comment=Comments_for_comments.objects.create( 
            commentor_account=self.user1,
            parent_comment=self.comment.id,
            from_original=True,
           comment="and wake up",
        )
    def test_create_blog(self):
        blog=Blogs.objects.all().first()
        self.assertEqual(blog.blog_title,self.blog.blog_title)
    def test_date_posted_set(self):
        self.assertIsNotNone(self.blog.date_posted)
    def test_date_modified_updated(self):
        prev_val=self.blog.last_date_modified
        self.blog.blog_title='whooping cough'
        self.blog.save()
        curr_val=self.blog.last_date_modified
        self.assertNotEqual(curr_val,prev_val)
    def test_create_comment(self):
        comment=Comments.objects.all().first()
        self.assertEqual(comment.blog_id,self.comment.blog_id)
    def test_create_comment_for_comment(self):
        comment_for_comment=Comments_for_comments.objects.all().first()
        self.assertEqual(comment_for_comment.comment,self.comment_for_comment.comment)
       