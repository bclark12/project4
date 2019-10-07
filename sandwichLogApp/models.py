from django.db import models
import datetime

class User(models.Model):
    username = models.CharField(max_length=20)
    email    = models.EmailField()

class Category(models.Model):
    category = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')

class Sandwich(models.Model):
    name = models.CharField(max_length=20)
    location = models.CharField(max_length=20)
    description = models.CharField(max_length=70)
    createdOn = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='categories')
