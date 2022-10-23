from django.urls import re_path as url
from pixelmate import views

urlpatterns = [url(r'^login$', views.authApi), url(
    r'^login/([0-9]+)$', views.authApi)]
