from email import message
from django.db import models
from accounts.models import User
from django.utils import timezone

# Create your models here.


class Reviews(models.Model):
    class rate_choices(models.IntegerChoices):
        STAR_1=1
        STAR_2=2
        STAR_3=3
        STAR_4=4
        STAR_5=5
    reviewer=models.OneToOneField(User,on_delete=models.CASCADE)
    star=models.IntegerField(choices=rate_choices.choices)
    message=models.CharField(max_length=250)
    date_posted=models.DateTimeField()
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_posted = timezone.now()
        self.last_date_modified = timezone.now()
        super(Reviews, self).save(*args, **kwargs)
