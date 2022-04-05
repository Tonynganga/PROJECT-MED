from django.test import TestCase
from accounts.models import User
from reviews.serializer import Reviews_serializer
from accounts.models import User,Profile

class TestSerializers(TestCase):
    def setUp(self):
        # self.user=User.objects.create(
        #     username= "testuser",
        #     first_name= "test",
        #     last_name= "user",
        #     email= "testuser@gmail.com",
        #     password= "kamikkkk", 
        #     is_patient= False,
        #     date_of_birth="2005-01-01" 
        # )
        self.review_sample={
            "star":2,
            "message":"check front end"
        }
        self.review_sample_star_required={
            "message":"check front end"
        }
        self.review_sample_message_required={
            "star":2,
        }
        
    def test_validate_data(self):
        serializer=Reviews_serializer(data=self.review_sample)
        self.assertTrue(serializer.is_valid())
    def test_invalidate_star(self):
        serializer=Reviews_serializer(data=self.review_sample_star_required)
        self.assertFalse(serializer.is_valid())
    def test_invalidate_message(self):
        serializer=Reviews_serializer(data=self.review_sample_message_required)
        self.assertFalse(serializer.is_valid())
    