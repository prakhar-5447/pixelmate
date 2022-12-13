from django import forms
from djongo import models
from datetime import datetime
from django.conf import settings

# Add the import for GridFSStorage
from djongo.storage import GridFSStorage

# Define your GrifFSStorage instance
grid_fs_storage = GridFSStorage(
    collection='myfiles', base_url=''.join([str(settings.BASE_DIR), 'myfiles/']))

# Create your models here.


class Signup(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Username = models.TextField()
    Email = models.TextField()
    Password = models.TextField()


class Login(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Username = models.TextField()
    Email = models.TextField()


class Tech(models.Model):
    name = models.TextField()

    class Meta:
        abstract = True


class TechForm(forms.ModelForm):
    class Meta:
        model = Tech
        fields = (
            'name',
        )


class ProjectOnGoing(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Name = models.TextField()
    Description = models.TextField()
    ProjectImage = models.TextField()
    CreatedDate = models.DateTimeField(default=datetime.now, blank=True)
    Url = models.URLField(max_length=100)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )


class Work(models.Model):
    Title = models.TextField()
    Date = models.DateTimeField(default=datetime.now, blank=True)

    class Meta:
        abstract = True


class WorkForm(forms.ModelForm):
    class Meta:
        model = Work
        fields = ('Title', 'Date'
                  )


class ProjectCompleted(models.Model):
    Id = models.AutoField(primary_key=True)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    Name = models.TextField()
    Description = models.TextField()
    ProjectImage = models.TextField()
    CreatedDate = models.DateTimeField(default=datetime.now, blank=True)
    CompletedDate = models.DateTimeField(default=datetime.now, blank=True)
    Work = models.ArrayField(
        model_container=Work,
        model_form_class=WorkForm
    )
    Url = models.URLField(max_length=100)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )


class Task(models.Model):
    Id = models.AutoField(primary_key=True)
    Project = models.ForeignKey(
        ProjectOnGoing, on_delete=models.CASCADE)
    Task = models.ArrayField(
        model_container=Work,
        model_form_class=WorkForm
    )


class Step(models.Model):
    title = models.TextField()

    class Meta:
        abstract = True


class StepForm(forms.ModelForm):
    class Meta:
        model = Step
        fields = ('title',)


class Challenge(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Description = models.TextField()
    ProjectImage = models.TextField()
    Difficulty_level = models.TextField()
    Url = models.URLField(max_length=100)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
    Progress = models.ArrayField(
        model_container=Step,
        model_form_class=StepForm
    )


class AcceptChallenge(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Description = models.TextField()
    Difficulty_level = models.TextField()
    ProjectImage = models.TextField()
    CurrentTask = models.IntegerField(default=0)
    Challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    AcceptedDate = models.DateTimeField(default=datetime.now, blank=True)
    Url = models.URLField(max_length=100)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
    Progress = models.ArrayField(
        model_container=Step,
        model_form_class=StepForm
    )


class CompleteChallenge(models.Model):
    Id = models.AutoField(primary_key=True)
    Name = models.TextField()
    Description = models.TextField()
    Difficulty_level = models.TextField()
    ProjectImage = models.TextField()
    Challenge = models.ForeignKey(
        Challenge, on_delete=models.CASCADE)
    Username = models.ForeignKey(
        Signup, on_delete=models.CASCADE)
    AcceptedDate = models.DateTimeField(default=datetime.now, blank=True)
    CompletedDate = models.DateTimeField(default=datetime.now, blank=True)
    Url = models.URLField(max_length=100)
    Technology = models.ArrayField(
        model_container=Tech,
        model_form_class=TechForm
    )
    Progress = models.ArrayField(
        model_container=Step,
        model_form_class=StepForm
    )
