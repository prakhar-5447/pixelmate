from django.urls import re_path as url
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from pixelmate import views


urlpatterns = [
    url(r'^signup$', views.signupApi),
    url(r'^login$', views.loginApi),
    path('user/<str:username>', views.userApi),
    path('userId/<str:id>', views.userApi),
    path('project/<str:id>', views.projectCompletedApi),
    url(r'^ongoing$', views.projectOnGoingApi),
    path('ongoing/<str:id>', views.projectOnGoingApi),
    path('complete/<str:id>', views.completeProjectApi),
    path('view/<str:id>', views.viewProjectApi),
    url(r'^task$', views.taskApi),
    path('task/<str:id>', views.taskApi),
    url(r'^challenge$', views.challengeApi),
    path('challenge/<str:id>', views.viewChallengeApi),
    url(r'^acceptChallenge$', views.acceptChallengeApi),
    path('acceptChallenge/<str:id>', views.acceptChallengeApi),
    url(r'^completeChallenge$', views.completeChallengeApi),
    path('completeChallenge/<str:id>', views.completeChallengeApi),
    path('viewCompleteChallenge/<str:userid>/<str:id>',
         views.viewCompleteChallengeApi),
    url(r'^upload$', views.uploadApi),
    path('upload/<str:name>', views.uploadApi),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# url(r'^login/([0-9]+)$', views.loginApi), sample
