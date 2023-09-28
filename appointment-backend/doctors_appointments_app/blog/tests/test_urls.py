from django.test import SimpleTestCase
from django.urls import reverse,resolve
from blog.views import Blog_API
from knox.views import LogoutView

class TestUrls(SimpleTestCase):
    def test_post_blog_url_is_resolved(self):
        url=reverse('post_blog')
        self.assertEqual(resolve(url).func.__name__,Blog_API.as_view({'post':'create'}).__name__)
    def test_get_blogs_url_is_resolved(self):
        url=reverse('get_blogs')
        self.assertEqual(resolve(url).func.__name__,Blog_API.as_view({'get':'list'}).__name__)
    def test_delete_blog_url_is_resolved(self):
        url=reverse('delete_blog',args=(1,))
        self.assertEqual(resolve(url).func.__name__,Blog_API.as_view({'delete':'destroy'}).__name__)
    def test_update_blog_url_is_resolved(self):
        url=reverse('update_blog',args=(1,))
        self.assertEqual(resolve(url).func.__name__,Blog_API.as_view({'put':'update'}).__name__)