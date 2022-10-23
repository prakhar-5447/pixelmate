from django.shortcuts import render
from django.urls import is_valid_path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from pixelmate.models import Login, Signup
from pixelmate.serializers import LoginSerializer, SignupSerializer

# Create your views here.


@csrf_exempt
def authApi(request, id=0):
    if request.method == "GET":
        LoginData = Login.objects.all()
        Login_serializer = LoginSerializer(LoginData, many=True)
        return JsonResponse(Login_serializer.data, safe=False)
    elif request.method == "POST":
        Login_data = JSONParser().parse(request)
        Login_serializer = LoginSerializer(data=Login_data)
        if Login_serializer.is_valid():
            Login_serializer.save()
            return JsonResponse("Added Sucessfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == "PUT":
        Login_data = JSONParser().parse(request)
        LoginData = Login.objects.get(Id=Login_data["Id"])
        Login_serializer = LoginSerializer(LoginData, data=Login_data)
        if Login_serializer.is_valid():
            Login_serializer.save()
            return JsonResponse("Update Sucessfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == "DELETE":
        LoginData = Login.objects.get(Id=id)
        LoginData.delete()
        return JsonResponse("Deleted Sucessfully", safe=False)
