"""
ASGI config for appointments project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
from blog import routing

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from blog.token_authentication_stack import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE',
                      'doctors_appointments_app.settings')


application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': TokenAuthMiddleware(AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
    )
})
