from rest_framework import serializers
from pixelmate.models import Login, Signup, Project


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = ("Id", "Name", "Username", "Email", "Password")


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ("Id", "Username", "Email")


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ("Id", "Username", "Name", "Description","Technology")
