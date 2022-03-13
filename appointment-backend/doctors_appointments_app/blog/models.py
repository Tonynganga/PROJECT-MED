from django.db import models
from accounts.models import User

# Create your models here.

class Blog(models.Model):
    blogger_account=models.ForeignKey(User,on_delete=models.CASCADE)
    blog_title=models.CharField(max_length=25)
    blog_content=models.CharField(max_length=200)
