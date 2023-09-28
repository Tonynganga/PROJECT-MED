from django.urls import path
from .views import Reviews_API

urlpatterns = [    
    path('reviews/post_review',Reviews_API.as_view({'post':'create'}),name='post_reviews'),
    path('reviews/get_reviews',Reviews_API.as_view({'get':'list'}),name='get_reviews'),
    path('reviews/get_review',Reviews_API.as_view({'get':'retrieve'}),name='get_review'),
    path('reviews/update_review',Reviews_API.as_view({'put':'update'}),name='update_review'),
]
