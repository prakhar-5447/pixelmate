from django.db import models

# Create your models here.


class Signup(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=30)
    Username = models.CharField(max_length=30)
    Email = models.CharField(max_length=50)
    Password = models.CharField(max_length=16)


class Login(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=30)
    Email = models.CharField(max_length=50)
    Password = models.CharField(max_length=16)
