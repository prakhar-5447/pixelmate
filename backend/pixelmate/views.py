from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.files.storage import default_storage
from django.http import FileResponse

from pixelmate.models import Login, Signup, ProjectCompleted, ProjectOnGoing, Task, Challenge, AcceptChallenge, CompleteChallenge
from pixelmate.serializers import LoginSerializer, SignupSerializer, ProjectCompletedSerializer, ProjectOnGoingSerializer, TaskSerializer, ChallengeSerializer, AcceptChallengeSerializer, CompleteChallengeSerializer

# Create your views here.


@csrf_exempt
def signupApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Username=reqData["Username"], Email=reqData["Email"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Username and Email Exist"})
        UserData = Signup.objects.filter(Email=reqData["Email"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Email Exist"})
        UserData = Signup.objects.filter(Username=reqData["Username"])
        if UserData:
            return JsonResponse({'success': False, 'msg': "User with same Username Exist"})
        Signup_serializer = SignupSerializer(data=reqData)
        if Signup_serializer.is_valid():
            Signup_serializer.save()
            return JsonResponse({'success': True, 'msg': "Signup Sucessfully"})
        return JsonResponse({'success': False, 'msg': "Failed to Create Account"})


@csrf_exempt
def loginApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        if reqData["Username"]:
            UserData = Signup.objects.filter(
                Username=reqData["Username"]).values()
            if UserData:
                if UserData[0]['Password'] == reqData["Password"]:
                    Login_serializer = LoginSerializer(data=UserData[0])
                    if Login_serializer.is_valid():
                        return JsonResponse({'success': True, 'msg': Login_serializer.data["Username"]})
                    return JsonResponse({'success': False, 'msg': "Failed"})
                return JsonResponse({'success': False, 'msg': "Incorrect Password"})
            else:
                return JsonResponse({'success': False, 'msg': "User not Exist"})
        elif reqData["Email"]:
            UserData = Signup.objects.filter(
                Email=reqData["Email"]).values()
            if UserData:
                if UserData[0]['Password'] == reqData["Password"]:
                    Login_serializer = LoginSerializer(data=UserData[0])
                    if Login_serializer.is_valid():
                        return JsonResponse({'success': True, 'msg': Login_serializer.data["Username"]})
                    return JsonResponse({'success': False, 'msg': "Failed"})
                return JsonResponse({'success': False, 'msg': "Incorrect Password"})
            else:
                return JsonResponse({'success': False, 'msg': "User not Exist"})
        return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def userApi(request, username="", id=0):
    if request.method == "GET":
        if(username):
            UserData = Signup.objects.filter(
                Username=username)
        elif(id):
            UserData = Signup.objects.filter(
                Id=id)
        if UserData:
            Login_serializer = LoginSerializer(UserData[0])
            return JsonResponse({'success': True, 'msg': Login_serializer.data})
        return JsonResponse({'success': False, 'msg': "User not Exist"})


@csrf_exempt
def projectCompletedApi(request, id=0):
    if request.method == "GET":
        ProjectData = ProjectCompleted.objects.filter(
            Username_id=id)
        if ProjectData:
            project_completed_serializer = ProjectCompletedSerializer(
                ProjectData, many=True)
            return JsonResponse({'success': True, 'msg': project_completed_serializer.data})
        return JsonResponse({'success': False, 'msg': "No project to display"})


@csrf_exempt
def viewProjectApi(request, id=0):
    if request.method == "GET":
        ProjectData = ProjectCompleted.objects.filter(
            Id=id)
        if ProjectData:
            project_completed_serializer = ProjectCompletedSerializer(
                ProjectData, many=True)
            return JsonResponse({'success': True, 'msg': project_completed_serializer.data})
        return JsonResponse({'success': False, 'msg': "No project to display"})


@csrf_exempt
def projectOnGoingApi(request, id=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Username_id=reqData["Username"])
        if ProjectData:
            return JsonResponse({'success': False, 'msg': "Project OnGoing"})
        project_ongoing_serializer = ProjectOnGoingSerializer(
            data=reqData)
        if project_ongoing_serializer.is_valid():
            project_ongoing_serializer.save()
            return JsonResponse({'success': True, 'msg': "Project Added"})
        return JsonResponse({'success': False, 'msg': "Failed"})
    elif request.method == "GET":
        ProjectData = ProjectOnGoing.objects.filter(
            Username_id=id)
        if ProjectData:
            project_ongoing_serializer = ProjectOnGoingSerializer(
                ProjectData, many=True)
            return JsonResponse({'success': True, 'msg': project_ongoing_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Project Found"})


@csrf_exempt
def completeProjectApi(request, id):
    if request.method == "GET":
        ProjectData = ProjectOnGoing.objects.filter(
            Id=id)
        if not ProjectData:
            return JsonResponse({'success': False, 'msg': "Project Not Found"})
        newData = ProjectData.values()[0]
        work = Task.objects.filter(Project_id=id)
        if work:
            newData["Work"] = work[0].Task
        else:
            newData["Work"] = []
        if newData:
            newData["Username"] = newData["Username_id"]
            del newData["Username_id"]
            project_completed_serializer = ProjectCompletedSerializer(
                data=newData)
            if project_completed_serializer.is_valid():
                project_completed_serializer.save()
                DeleteData = ProjectOnGoing.objects.filter(
                    Id=id)
                DeleteData.delete()
                return JsonResponse({'success': True, 'msg': "Project Completed"})
            return JsonResponse({'success': False, 'msg': "Failed"})


@ csrf_exempt
def taskApi(request, id=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Id=reqData["Project"])
        if not ProjectData:
            return JsonResponse({'success': False, 'msg': "Project Not Found"})
        taskData = Task.objects.filter(Project_id=reqData["Project"])
        if taskData:
            return JsonResponse({'success': False, 'msg': "Project Task Already Exist"})
        dict = {
            "Project": reqData['Project'],
            "Task": reqData['Task']
        }
        task_serializer = TaskSerializer(
            data=dict)
        if task_serializer.is_valid():
            task_serializer.save()
            return JsonResponse({'success': True, 'msg': "Task Added"})
        return JsonResponse({'success': False, 'msg': "Project Not Found"})
    elif request.method == "GET":
        taskData = Task.objects.filter(Project_id=id)
        if taskData:
            Task_serializer = TaskSerializer(taskData, many=True)
            return JsonResponse({'success': True, 'msg': Task_serializer.data})
        return JsonResponse({'success': False, 'msg': "Task Not Found"})
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Id=reqData["Project"])
        if not ProjectData:
            return JsonResponse({"success": False, 'msg': "Project Not Found"})
        taskData = Task.objects.filter(Project_id=reqData["Project"])
        if taskData:
            newTask = {"Task": reqData['Task']}
            Task_serializer = TaskSerializer(
                taskData, data=newTask)
            if Task_serializer.is_valid():
                Task_serializer.save()
                return JsonResponse({"success": True, 'msg': "Update Sucessfully"})
            return JsonResponse({"success": False, 'msg': "Failed to Update"})
        return JsonResponse({"success": False, 'msg': "Task Not Found"})


@ csrf_exempt
def challengeApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        challenge_serializer = ChallengeSerializer(
            data=reqData)
        if challenge_serializer.is_valid():
            challenge_serializer.save()
            return JsonResponse({'success': True, 'msg': "Challenge Added"})
        return JsonResponse({'success': False, 'msg': "Failed"})
    elif request.method == "GET":
        ChallengeData = Challenge.objects.all()
        if ChallengeData:
            challenge_serializer = ChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse({'success': True, 'msg': challenge_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Challenge Found"})


@csrf_exempt
def viewChallengeApi(request, id=0):
    if request.method == "GET":
        ChallengeData = Challenge.objects.filter(
            Id=id)
        if ChallengeData:
            challenge_serializer = ChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse({'success': True, 'msg': challenge_serializer.data})
        return JsonResponse({'success': False, 'msg': "No project to display"})


@ csrf_exempt
def acceptChallengeApi(request, id=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Id=reqData["Username"])
        if not UserData:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        AcceptedChallengeData = AcceptChallenge.objects.filter(
            Username_id=reqData["Username"])
        if AcceptedChallengeData:
            return JsonResponse({'success': False, 'msg': "Challenge OnGoing"})
        CompletedChallengeData = CompleteChallenge.objects.filter(
            Username_id=reqData["Username"], Challenge_id=reqData["Id"])
        if CompletedChallengeData:
            return JsonResponse({'success': False, 'msg': "Challenge Already Completed"})
        ChallengeData = Challenge.objects.filter(Id=reqData["Id"])
        if ChallengeData:
            newData = ChallengeData.values()[0]
            newData["Username"] = reqData["Username"]
            newData["Challenge"] = newData["Id"]
            accept_challenge_serializer = AcceptChallengeSerializer(
                data=newData)
            if accept_challenge_serializer.is_valid():
                accept_challenge_serializer.save()
                return JsonResponse({'success': True, 'msg': "Challenge Accepted"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Challenge Not Found"})
    elif request.method == "GET":
        ChallengeData = AcceptChallenge.objects.filter(
            Username_id=id)
        if ChallengeData:
            accept_challenge_serializer = AcceptChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse({'success': True, 'msg': accept_challenge_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Challenge Found"})
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Id=reqData["Username"])
        if not UserData:
            return JsonResponse({'success': False, 'msg': "User Not Found"})
        AcceptedChallengeData = AcceptChallenge.objects.filter(
            Username_id=reqData["Username"], Id=reqData["Id"])
        if AcceptedChallengeData:
            newTask = {"CurrentTask": int(reqData["CurrentTask"])}
            accept_challenge_serializer = AcceptChallengeSerializer(
                AcceptedChallengeData, data=newTask)
            if accept_challenge_serializer.is_valid():
                accept_challenge_serializer.save()
                return JsonResponse({'success': True, 'msg': "Update Sucessfully"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Challenge Not Found"})


@ csrf_exempt
def completeChallengeApi(request, id=0):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        ChallengeData = AcceptChallenge.objects.filter(Id=reqData["Id"])
        if ChallengeData:
            newData = ChallengeData.values()[0]
            newData["Username"] = newData["Username_id"]
            newData["Challenge"] = newData["Challenge_id"]
            del newData["CurrentTask"]
            del newData["Username_id"]
            del newData["Challenge_id"]
            print(newData)
            complete_challenge_serializer = CompleteChallengeSerializer(
                data=newData)
            if complete_challenge_serializer.is_valid():
                complete_challenge_serializer.save()
                DeleteData = AcceptChallenge.objects.filter(
                    Id=reqData["Id"])
                DeleteData.delete()
                return JsonResponse({'success': True, 'msg': "Challenge Completed"})
            return JsonResponse({'success': False, 'msg': "Failed"})
        return JsonResponse({'success': False, 'msg': "Challenge Not Found"})
    elif request.method == "GET":
        ChallengeData = CompleteChallenge.objects.filter(
            Username_id=id)
        if ChallengeData:
            complete_challenge_serializer = CompleteChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse({'success': True, 'msg': complete_challenge_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Challenge Found"})


@ csrf_exempt
def viewCompleteChallengeApi(request, userid=0, id=0):
    if request.method == "GET":
        ChallengeData = CompleteChallenge.objects.filter(
            Username_id=userid, Id=id)
        if ChallengeData:
            complete_challenge_serializer = CompleteChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse({'success': True, 'msg': complete_challenge_serializer.data})
        return JsonResponse({'success': False, 'msg': "No Challenge Found"})


@csrf_exempt
def uploadApi(request, name=''):
    if request.method == "POST":
        file_data = request.FILES["file"]
        filename = default_storage.save(file_data.name, file_data)
        return JsonResponse({"msg": filename})
    elif request.method == "GET":
        img = open('./Photos/' + name, 'rb')
        response = FileResponse(img)
        return response


@ csrf_exempt
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
