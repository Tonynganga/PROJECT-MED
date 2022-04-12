from django.urls import path,include
from .views import LoginAPI,RegisterAPI,ProfileAPI
from knox import views as knox_views



urlpatterns = [
    path('auth',include('knox.urls')),
    path('auth/register',RegisterAPI.as_view(),name='register'),
    path('auth/profile',ProfileAPI.as_view(),name='profile'),
    path('auth/login',LoginAPI.as_view(),name='login'),
    path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout'),
]
