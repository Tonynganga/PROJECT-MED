from django.urls import path
from .views import Blog_API,Comment_API

urlpatterns = [    
    path('blogs/post_blog',Blog_API.as_view({'post':'create'})),
    path('blogs/get_blogs',Blog_API.as_view({'get':'list'})),
    path('blogs/add_comment',Comment_API.as_view({'post':'create'})),
    path('blogs/get_comments/<int:blog_id>',Comment_API.as_view({'get':'list'})),
]