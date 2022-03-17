from django.test import SimpleTestCase
from django.urls import reverse,resolve
from accounts.views import RegisterAPI,LoginAPI,ProfileAPI
from knox.views import LogoutView

class TestUrls(SimpleTestCase):
    def test_user_register_url_is_resolved(self):
        url=reverse('register')
        self.assertEqual(resolve(url).func.view_class,RegisterAPI)
    def test_user_login_url_is_resolved(self):
        url=reverse('login')
        self.assertEqual(resolve(url).func.view_class,LoginAPI)
    def test_user_profile_url_is_resolved(self):
        url=reverse('profile')
        self.assertEqual(resolve(url).func.view_class,ProfileAPI)
    def test_user_logout_url_is_resolved(self):
        url=reverse('knox_logout')
        self.assertEqual(resolve(url).func.view_class,LogoutView)