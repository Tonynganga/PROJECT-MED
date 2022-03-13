from django.urls import path
from .views import Blog_API

urlpatterns = [    
    path('blogs/post_blog',Blog_API.as_view({'post':'create'})),
    path('blogs/get_blogs',Blog_API.as_view({'get':'list'})),
    path('blogs/get_blog/<int:pk>',Blog_API.as_view({'get':'retrieve'})),
]