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
        (GENDER_NOTDISCLOSE, 'Do not disclose')
    )
    A_POSITIVE= "A+" 
    A_NEGATIVE="A-" 
    B_POSITIVE="B+"
    B_NEGATIVE="B-"
    AB_POSITIVE="AB+"
    AB_NEGATIVE="AB-" 
    O_POSITIVE="O+"
    O_NEGATIVE="0-" 

    BLOOD_GROUP_CHOICES=(
        (A_POSITIVE,"a_positive"),
        (A_NEGATIVE,"a_negative"),
        (B_POSITIVE,"b_positive"),
        (B_NEGATIVE,"b_negative"),
        (AB_POSITIVE,"AB_POSITIVE"),
        (AB_NEGATIVE,"ab_negative"),
        (O_POSITIVE,"o_positive"),
        (O_NEGATIVE,"o_negative"),
    )    
    # phoneNumberRegex = RegexValidator(regex = r"^\+?1?\d{8,15}$")
    phone_number = models.CharField(null=True,blank=True,max_length = 16)
    blood_group = models.CharField(max_length = 16,choices=BLOOD_GROUP_CHOICES)
    address = models.CharField(null=True,blank=True,max_length = 16)
    gender = models.CharField(max_length=9,choices=GENDER_CHOICES,default=GENDER_NOTDISCLOSE)
    #date format YYYY-MM-DD
    date_of_birth=models.DateField()
    is_doctor = models.BooleanField('student status', default=False)
    is_patient = models.BooleanField('teacher status', default=False)

    def has_profile(self):
        has_profile = False
        try:
            has_profile = (self.profile is not None)
        except Profile.DoesNotExist:
            pass
        return has_profile

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


