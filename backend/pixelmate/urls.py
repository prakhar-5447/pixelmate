from django.urls import re_path as url
from pixelmate import views

urlpatterns = [
    url(r'^signup$', views.signupApi),
    url(r'^login$', views.loginApi),
    url(r'^user$', views.userApi),
    url(r'^project$', views.projectApi),
]

# url(r'^login/([0-9]+)$', views.loginApi), sample
