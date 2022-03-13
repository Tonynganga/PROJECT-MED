from django.db import models
from accounts.models import User

# Create your models here.

class Blogs(models.Model):
    blogger_account=models.ForeignKey(User,on_delete=models.CASCADE)
    blog_title=models.CharField(max_length=25)
    blog_content=models.CharField(max_length=200)
class Comments(models.Model):
    commentor_account=models.ForeignKey(User,on_delete=models.CASCADE)
    blog=models.ForeignKey(Blogs,on_delete=models.CASCADE)
    comment=models.CharField(max_length=200)