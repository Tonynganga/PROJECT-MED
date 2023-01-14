from django.test import SimpleTestCase
from django.urls import reverse,resolve
from reviews.views import Reviews_API

class TestUrls(SimpleTestCase):
    def test_post_review_is_resolved(self):
        url=reverse('post_reviews')
        self.assertEqual(resolve(url).func.__name__,Reviews_API.as_view({'post':'create'}).__name__)
    def test_get_reviews_is_resolved(self):
        url=reverse('get_reviews')
        self.assertEqual(resolve(url).func.__name__,Reviews_API.as_view({'get':'list'}).__name__)
    def test_get_review_is_resolved(self):
        url=reverse('get_review')
        self.assertEqual(resolve(url).func.__name__,Reviews_API.as_view({'get':'retrieve'}).__name__)
    def test_update_review_is_resolved(self):
        url=reverse('update_review')
        self.assertEqual(resolve(url).func.__name__,Reviews_API.as_view({'put':'update'}).__name__)