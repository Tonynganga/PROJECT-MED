from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from datetime import datetime    
from PIL import Image

# Create your models here.

class User(AbstractUser):
    GENDER_MALE = 'M'
    GENDER_FEMALE = 'F'
    GENDER_NOTDISCLOSE='D'
    GENDER_CHOICES = (
        (GENDER_MALE, 'male'), 
        (GENDER_FEMALE, 'female'), 
        (GENDER_NOTDISCLOSE, '')
    )
    
    # phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(max_length = 16,default="")
    blood_group = models.CharField(max_length = 16,default="")
    address = models.CharField(max_length = 16,default="")
    gender = models.CharField(max_length=9,choices=GENDER_CHOICES,default=GENDER_NOTDISCLOSE)
    date_of_birth=models.DateField(default=now)
    is_doctor = models.BooleanField('student status', default=False)
    is_patient = models.BooleanField('teacher status', default=False)
class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    image = models.ImageField(default='default.png',upload_to='profile_pics')
    def __str__ (self):
        return f'{self.user.username} Profile'
    def save(self ,*args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
        img=Image.open(self.image.path)
        if img.height>300 or img.width > 300:
            output_size=(300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)


