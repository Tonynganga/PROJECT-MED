from django.urls import path,include
from .views import LoginAPI,RegisterAPI,ProfileAPI,CheckEmailApi,ChangePassword,ForgotPassword
from knox import views as knox_views



urlpatterns = [
    path('auth',include('knox.urls')),
    path('auth/register',RegisterAPI.as_view(),name='register'),
    path('auth/profile',ProfileAPI.as_view(),name='profile'),
    path('auth/login',LoginAPI.as_view(),name='login'),
    path('auth/logout',knox_views.LogoutView.as_view(),name='knox_logout'),
    path('auth/check_email',CheckEmailApi.as_view(),name='check_email'),
    path('auth/forgot_passord',ForgotPassword.as_view(),name='forgot_password'),
    path('auth/change_password',ChangePassword.as_view(),name='change_password'),
]
