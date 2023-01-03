from rest_framework import serializers
from .models import Reviews

class Reviews_serializer(serializers.ModelSerializer):
    reviewer_first_name=serializers.CharField(source='reviewer.first_name',required=False)
    reviewer_last_name=serializers.CharField(source='reviewer.last_name',required=False)
    reviewer_profile_pic=serializers.URLField(source='reviewer.profile.image.url',required=False)
    class Meta:
        model=Reviews
        read_only_fields=['id','reviewer_first_name','reviewer_last_name','date_posted','reviewer_profile_pic']
        fields=['id','reviewer_first_name','reviewer_last_name','star','message','date_posted','reviewer_profile_pic']

