from rest_framework import serializers
from .models import User, Category, Sandwich

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ['id', 'username', 'email']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category', 'user']

class SandwichSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sandwich
        fields = ['id', 'name', 'location', 'description', 'createdOn', 'category']
