from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    is_doctor = models.BooleanField('student status', default=False)
    is_patient = models.BooleanField('teacher status', default=False)