from django.db import models
from django.forms import SlugField
from accounts.models import User
from django.utils import timezone

# Create your models here.

class Blogs(models.Model):
    blogger_account=models.ForeignKey(User,on_delete=models.CASCADE)
    date_posted=models.DateTimeField()
    last_date_modified=models.DateTimeField()
    blog_title=models.CharField(max_length=25)
    blog_content=models.CharField(max_length=200)
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_posted = timezone.now()
        self.last_date_modified = timezone.now()
        return super(Blogs, self).save(*args, **kwargs)
class Comments(models.Model):
    commentor_account=models.ForeignKey(User,on_delete=models.CASCADE)
    blog=models.ForeignKey(Blogs,on_delete=models.CASCADE)
    comment=models.CharField(max_length=200)