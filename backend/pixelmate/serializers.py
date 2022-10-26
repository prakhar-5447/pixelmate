from rest_framework import serializers
from pixelmate.models import Login, Signup, ProjectCompleted, ProjectOnGoing, Task


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signup
        fields = ("Id", "Name", "Username", "Email", "Password")


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ("Id", "Username", "Email")


class ProjectCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCompleted
        fields = ("Id", "Username", "Name", "Description",
                  "CreatedDate", "CompletedDate", "Work", "Url", "Technology")


class ProjectOnGoingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectOnGoing
        fields = ("Id", "Username", "Name", "Description",
                  "CreatedDate", "Url", "Technology")


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ("Id", "Project", "Title", "Date")
