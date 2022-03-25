from rest_framework import serializers
from .models import Reviews

class Reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model=Reviews
        fields=['id','star','message']
        read_only_fields=['id']
