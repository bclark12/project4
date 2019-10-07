from django.db import models

class User(models.Model):
    email    = models.EmailField()
    username = models.CharField(max_length=20)

class Issue(models.Model):
    description = models.CharField(max_length=80)
    status      = models.BooleanField()
    createdOn   = models.DateTimeField(auto_now=True)
    user        = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')