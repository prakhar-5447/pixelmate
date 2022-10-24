from django.shortcuts import render
from django.urls import is_valid_path
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from pixelmate.models import Login, Signup
from pixelmate.serializers import LoginSerializer, SignupSerializer, ProjectSerializer

# Create your views here.


@csrf_exempt
def signupApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Username=reqData["Username"], Email=reqData["Email"])
        if UserData:
            return JsonResponse("User with same Username and Email Exist", safe=False)
        UserData = Signup.objects.filter(Email=reqData["Email"])
        if UserData:
            return JsonResponse("User with same Email Exist", safe=False)
        UserData = Signup.objects.filter(Username=reqData["Username"])
        if UserData:
            return JsonResponse("User with same Username Exist", safe=False)
        Signup_serializer = SignupSerializer(data=reqData)
        if Signup_serializer.is_valid():
            Signup_serializer.save()
            return JsonResponse("Signup Sucessfully", safe=False)
        return JsonResponse("Failed to Create Account", safe=False)


@csrf_exempt
def loginApi(request):
    if request.method == "GET":
        reqData = JSONParser().parse(request)
        if reqData["Username"]:
            UserData = Signup.objects.filter(
                Username=reqData["Username"]).values()
            if UserData:
                if UserData[0]["Password"] == reqData["Password"]:
                    Login_serializer = LoginSerializer(UserData, many=True)
                    return JsonResponse(Login_serializer.data[0]["Username"], safe=False)
                return JsonResponse("Incorrect Password", safe=False)
            else:
                return JsonResponse("User not Exist", safe=False)
        elif reqData["Email"]:
            UserData = Signup.objects.filter(
                Email=reqData["Email"]).values()
            if UserData:
                if UserData[0]["Password"] == reqData["Password"]:
                    Login_serializer = LoginSerializer(UserData, many=True)
                    return JsonResponse(Login_serializer.data[0]["Username"], safe=False)
                return JsonResponse("Incorrect Password", safe=False)
            else:
                return JsonResponse("User not Exist", safe=False)
        return JsonResponse("User not Exist", safe=False)


@csrf_exempt
def userApi(request):
    if request.method == "GET":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Username=reqData["Username"])
        if UserData:
            Login_serializer = LoginSerializer(UserData, many=True)
            return JsonResponse(Login_serializer.data, safe=False)
        return JsonResponse("User not Exist", safe=False)


@csrf_exempt
def projectApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        project_serializer = ProjectSerializer(data=reqData)
        if project_serializer.is_valid():
            project_serializer.save()
            return JsonResponse("Project Added", safe=False)
        return JsonResponse("Failed", safe=False)
    elif request.method == "GET":
        pass


@csrf_exempt
def sample(request, id=0):
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
