from rest_framework import serializers
from pixelmate.models import Login, Signup, ProjectCompleted, ProjectOnGoing, Task, Challenge, AcceptChallenge, CompleteChallenge


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
        fields = ("Id", "Project", "Task")


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ("Id", "Name", "Description",
                  "Difficulty_level", "Url", "Technology", "Progress")


class AcceptChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcceptChallenge
        fields = ("Id", "Name", "Description",
                  "Difficulty_level", "CurrentTask", "Challenge", "Username", "AcceptedDate", "Url", "Technology", "Progress")


class CompleteChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompleteChallenge
        fields = ("Id", "Name", "Description",
                  "Difficulty_level", "Challenge", "Username", "AcceptedDate", "CompletedDate", "Url", "Technology", "Progress")
