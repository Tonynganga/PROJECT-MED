from django.db import models
from django.template import Origin
from accounts.models import User
from django.utils import timezone
from PIL import Image

# Create your models here.

class Categories(models.TextChoices):
    GENERAL='general'
    NEUROLOGICAL="neurological" 
    PEDIATRICS="pediatrics"
    UROGENITAL="urogenital"     
    OPHTHALMOLOGY="ophthalmology" 
    ALLERGY_ANG_IMMUNOLOGY="allergy and immunology" 
    PSYCHIATRY="psychiatry" 
    ORAL="oral" 
    SURGERY="surgery" 
    UROLOGY="urology" 
    DERMATOLOGY="dermatology"
    PATHOLOGY="pathology"
    CARDIOLOGY= "cardiology" 
    DENTISTRY= "dentistry"

class Blogs(models.Model):
    blogger_account=models.ForeignKey(User,on_delete=models.CASCADE)
    category=models.CharField(max_length = 25,choices=Categories.choices)
    date_posted=models.DateTimeField()
    last_date_modified=models.DateTimeField()
    blog_title=models.CharField(max_length=25)
    blog_content=models.CharField(max_length=2000)
    thumbnail = models.ImageField(upload_to='blog-thumbnails',null=True)
    excerpt = models.CharField(max_length=150,null=True)
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_posted = timezone.now()
        self.last_date_modified = timezone.now()
        super(Blogs, self).save(*args, **kwargs)
        if self.thumbnail:
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
    date_posted=models.DateTimeField(auto_now_add=True)
    comment=models.CharField(max_length=200)
class Comments_for_comments(models.Model):
    commentor_account=models.ForeignKey(User,on_delete=models.CASCADE)
    parent_comment=models.IntegerField()
    date_posted=models.DateTimeField(auto_now_add=True)
    comment=models.CharField(max_length=200)
    from_original=models.BooleanField(default=False)