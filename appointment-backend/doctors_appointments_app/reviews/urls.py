from django.urls import path
from .views import Reviews_API

urlpatterns = [    
    path('reviews/post_review',Reviews_API.as_view({'post':'create'})),
    path('reviews/get_reviews',Reviews_API.as_view({'get':'list'})),
    path('reviews/get_review',Reviews_API.as_view({'get':'retrieve'})),
]
