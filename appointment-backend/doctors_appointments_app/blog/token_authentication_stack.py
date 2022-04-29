from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from knox.auth import TokenAuthentication
from django.db import close_old_connections
from urllib.parse import parse_qs
from rest_framework.exceptions import AuthenticationFailed


@database_sync_to_async
def get_user(scope):
    try:
        token_key = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
        user, _ = TokenAuthentication().authenticate_credentials(token_key.encode('ascii'))
        close_old_connections()
        return user
    except AuthenticationFailed as e:
        return AnonymousUser()
    except KeyError:
        return AnonymousUser()


class TokenAuthMiddleware:
    def __init__(self, inner) -> None:
        self.inner = inner

    def __call__(self, scope):
        return TokenAuthMiddlewareInstance(scope, self)


class TokenAuthMiddlewareInstance:
    def __init__(self, scope, middleware) -> None:
        self.scope = dict(scope)
        self.inner = middleware.inner

    async def __call__(self, receive, send):
        self.scope["user"] = await get_user(self.scope)
        return await self.inner(self.scope, receive, send)
