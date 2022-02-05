from django.urls import path,include
from .views import LoginAPI,RegisterAPI,ProfileAPI,UserAPI
from knox import views as knox_views
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static

route=routers.DefaultRouter()
# route.register('auth/profile',ProfileAPI.as_view(),'profile')

urlpatterns = [
    path('auth',include('knox.urls')),
    path('auth/register',RegisterAPI.as_view()),
    path('auth/profile',ProfileAPI.as_view(),name='profile'),
    path('auth/login',LoginAPI.as_view()),
    path('auth/user',UserAPI.as_view()),
    path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout'),
]

urlpatterns += route.urls