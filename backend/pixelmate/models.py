from tabnanny import verbose
from django.db import models
from django import forms
from djongo import models

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


class Tech(models.Model):
    name = models.CharField(max_length=20)

    class Meta:
        abstract = True


class TechForm(forms.ModelForm):
    class Meta:
        model = Tech
        fields = (
            'name',
        )


class Project(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE, default=1)
    Name = models.CharField(max_length=30)
    Description = models.CharField(max_length=50)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
