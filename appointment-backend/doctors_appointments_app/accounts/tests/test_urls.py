from django.test import SimpleTestCase
from django.urls import reverse,resolve
from accounts.views import RegisterAPI,UserAPI,LoginAPI,ProfileAPI
from knox.views import LogoutView

class TestUrls(SimpleTestCase):
    def test_user_register_url_is_resolved(self):
        url=reverse('register')
        self.assertEquals(resolve(url).func.view_class,RegisterAPI)
    def test_user_details_url_is_resolved(self):
        url=reverse('user_details')
        self.assertEquals(resolve(url).func.view_class,UserAPI)
    def test_user_login_url_is_resolved(self):
        url=reverse('login')
        self.assertEquals(resolve(url).func.view_class,LoginAPI)
    def test_user_profile_url_is_resolved(self):
        url=reverse('profile')
        self.assertEquals(resolve(url).func.view_class,ProfileAPI)
    def test_user_logout_url_is_resolved(self):
        url=reverse('knox_logout')
        self.assertEquals(resolve(url).func.view_class,LogoutView)