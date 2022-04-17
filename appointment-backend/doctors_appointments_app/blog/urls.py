from django.urls import path
from .views import Blog_API,Comment_API,Comments_for_comments_API

urlpatterns = [    
    path('blogs/post_blog',Blog_API.as_view({'post':'create'})),
    path('blogs/get_blogs',Blog_API.as_view({'get':'list'})),
    path('blogs/add_comment',Comment_API.as_view({'post':'create'})),
    path('blogs/update_comment/<int:pk>',Comment_API.as_view({'put':'update'})),
    path('blogs/delete_comment/<int:pk>',Comment_API.as_view({'post':'destroy'})),
    path('blogs/get_comments/<int:blog_id>',Comment_API.as_view({'get':'list'})),
    path('blogs/add_comment_for_comment',Comments_for_comments_API.as_view({'post':'create'})),
    path('blogs/update_comment_for_comment/<int:pk>',Comments_for_comments_API.as_view({'put':'update'})),
    path('blogs/delete_comment_for_comment/<int:pk>',Comments_for_comments_API.as_view({'post':'destroy'})),
    path('blogs/get_comments_for_comment/<int:comment_id>',Comments_for_comments_API.as_view({'get':'list'})),
    path('blogs/get_comments_for_original_comment/<int:comment_id>',Comments_for_comments_API.as_view({'get':'list_from_original'})),

]

