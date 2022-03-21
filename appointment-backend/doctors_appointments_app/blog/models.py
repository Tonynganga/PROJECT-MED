from django.db import models
from accounts.models import User
from django.utils import timezone
from PIL import Image

# Create your models here.

class Blogs(models.Model):
    blogger_account=models.ForeignKey(User,on_delete=models.CASCADE)
    date_posted=models.DateTimeField()
    last_date_modified=models.DateTimeField()
    blog_title=models.CharField(max_length=25)
    blog_content=models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='blog-thumbnails',null=True)
    excerpt = models.CharField(max_length=150,null=True)
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_posted = timezone.now()
        self.last_date_modified = timezone.now()
        super(Blogs, self).save(*args, **kwargs)
        img=Image.open(self.thumbnail.path)
        if img.height>500 or img.width > 500:
            output_size=(500,500)
            img.thumbnail(output_size)
            img.save(self.thumbnail.path)
        else:
            img.save(self.thumbnail.path)
class Comments(models.Model):
    commentor_account=models.ForeignKey(User,on_delete=models.CASCADE)
    blog=models.ForeignKey(Blogs,on_delete=models.CASCADE)
    comment=models.CharField(max_length=200)