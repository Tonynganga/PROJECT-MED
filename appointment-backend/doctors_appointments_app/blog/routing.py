from django.urls import re_path 
from . import consumer

websocket_urlpatterns = [
    re_path(r"^blogs/", consumer.BlogsConsumer.as_asgi()),
    re_path(r"^comments/", consumer.CommentsConsumer.as_asgi()),
    # re_path(r"^comments_for_comments/", consumer.CommentsForCommentConsumer.as_asgi())
]