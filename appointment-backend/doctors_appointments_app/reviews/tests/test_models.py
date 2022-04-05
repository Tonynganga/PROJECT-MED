from django.test import TestCase
from reviews.models import Reviews
from accounts.models import User

class TestModels(TestCase):
    def test_created(self):
        user=User.objects.create(
            username= "testuser",
            first_name= "test",
            last_name= "user",
            email= "testuser@gmail.com",
            password= "kamikkkk", 
            is_patient= False,
            date_of_birth="2005-01-01" 
        )
        review=Reviews.objects.create(
            reviewer=user,
            star=2,
            message="there is no frontend",
        )
        review2=Reviews.objects.all().first()
        self.assertEqual(review.message,review2.message)