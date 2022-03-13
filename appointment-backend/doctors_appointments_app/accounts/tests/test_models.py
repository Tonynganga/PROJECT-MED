from django.test import TestCase
from accounts.models import User,Profile

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
    def test_profile_created_on_user_save(self):
        self.assertTrue(self.user.has_profile())
    def test_profile_image_set_to_default_image(self):
        try:
            self.profile=self.user.profile
        except Profile.DoesNotExist:
            self.fail("profile does not exist")
            return
        self.assertEqual(self.profile.image.name,'default.png')

