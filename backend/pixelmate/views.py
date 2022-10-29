from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

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
                if UserData[0]['Password'] == reqData["Password"]:
                    Login_serializer = LoginSerializer(data=UserData[0])
                    if Login_serializer.is_valid():
                        return JsonResponse(Login_serializer.data[0]["Username"], safe=False)
                    return JsonResponse("Failed", safe=False)
                return JsonResponse("Incorrect Password", safe=False)
            else:
                return JsonResponse("User not Exist", safe=False)
        elif reqData["Email"]:
            UserData = Signup.objects.filter(
                Email=reqData["Email"]).values()
            if UserData:
                if UserData[0]['Password'] == reqData["Password"]:
                    Login_serializer = LoginSerializer(data=UserData[0])
                    if Login_serializer.is_valid():
                        return JsonResponse(Login_serializer.data["Username"], safe=False)
                    return JsonResponse("Failed", safe=False)
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
            Login_serializer = LoginSerializer(UserData[0])
            return JsonResponse(Login_serializer.data, safe=False)
        return JsonResponse("User not Exist", safe=False)


@csrf_exempt
def projectCompletedApi(request):
    if request.method == "GET":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectCompleted.objects.filter(
            Username_id=reqData["Username"])
        if ProjectData:
            project_completed_serializer = ProjectCompletedSerializer(
                ProjectData, many=True)
            return JsonResponse(project_completed_serializer.data, safe=False)
        return JsonResponse("No project to display", safe=False)


@csrf_exempt
def projectOnGoingApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        project_ongoing_serializer = ProjectOnGoingSerializer(
            data=reqData)
        if project_ongoing_serializer.is_valid():
            project_ongoing_serializer.save()
            return JsonResponse("Project Added", safe=False)
        return JsonResponse("Failed", safe=False)
    elif request.method == "GET":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Username_id=reqData["Username"])
        if ProjectData:
            project_ongoing_serializer = ProjectOnGoingSerializer(
                ProjectData, many=True)
            return JsonResponse(project_ongoing_serializer.data, safe=False)


@csrf_exempt
def completeProjectApi(request):
    if request.method == "GET":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Id=reqData["Id"])
        if not ProjectData:
            return JsonResponse("Project Not Found", safe=False)
        newData = ProjectData.values()[0]
        work = Task.objects.get(Project_id=reqData["Id"])
        if work:
            newData["Work"] = work.Task
        else:
            newData["Work"] = []
        if newData:
            project_completed_serializer = ProjectCompletedSerializer(
                data=newData)
            if project_completed_serializer.is_valid():
                project_completed_serializer.save()
                DeleteData = ProjectOnGoing.objects.filter(
                    Id=reqData["Id"])
                DeleteData.delete()
                return JsonResponse("Project Completed", safe=False)
            return JsonResponse("Failed", safe=False)


@ csrf_exempt
def taskApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Id=reqData["Project"])
        if not ProjectData:
            return JsonResponse("Project Not Found", safe=False)
        taskData = Task.objects.filter(Project_id=reqData["Project"])
        if taskData:
            return JsonResponse("Project Task Already Exist", safe=False)
        dict = {
            "Project": reqData['Project'],
            "Task": reqData['Task']
        }
        task_serializer = TaskSerializer(
            data=dict)
        if task_serializer.is_valid():
            task_serializer.save()
            return JsonResponse("Task Added", safe=False)
        return JsonResponse("Project Not Found", safe=False)
    elif request.method == "GET":
        reqData = JSONParser().parse(request)
        taskData = Task.objects.filter(Project_id=reqData["Project"])
        if taskData:
            Task_serializer = TaskSerializer(taskData, many=True)
            return JsonResponse(Task_serializer.data, safe=False)
        return JsonResponse("Task Not Found", safe=False)
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        ProjectData = ProjectOnGoing.objects.filter(
            Id=reqData["Project"])
        if not ProjectData:
            return JsonResponse("Project Not Found", safe=False)
        taskData = Task.objects.get(Project_id=reqData["Project"])
        if taskData:
            newTask = {"Task": reqData['Task']}
            Task_serializer = TaskSerializer(
                taskData, data=newTask)
            if Task_serializer.is_valid():
                Task_serializer.save()
                return JsonResponse("Update Sucessfully", safe=False)
            return JsonResponse("Failed to Update", safe=False)
        return JsonResponse("Task Not Found", safe=False)


@ csrf_exempt
def challengeApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        challenge_serializer = ChallengeSerializer(
            data=reqData)
        if challenge_serializer.is_valid():
            challenge_serializer.save()
            return JsonResponse("Challenge Added", safe=False)
        return JsonResponse("Failed", safe=False)
    elif request.method == "GET":
        ChallengeData = Challenge.objects.all()
        if ChallengeData:
            challenge_serializer = ChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse(challenge_serializer.data, safe=False)
        return JsonResponse("No Challenge Found", safe=False)


@ csrf_exempt
def acceptChallengeApi(request):
    if request.method == "POST":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Id=reqData["Username"])
        if not UserData:
            return JsonResponse("User Not Found", safe=False)
        AcceptedChallengeData = AcceptChallenge.objects.filter(
            Username_id=reqData["Username"])
        if AcceptedChallengeData:
            return JsonResponse("Challenge OnGoing", safe=False)
        CompletedChallengeData = CompleteChallenge.objects.filter(
            Username_id=reqData["Username"], Challenge_id=reqData["Id"])
        if CompletedChallengeData:
            return JsonResponse("Challenge Already Completed", safe=False)
        ChallengeData = Challenge.objects.filter(Id=reqData["Id"])
        if ChallengeData:
            newData = ChallengeData.values()[0]
            newData["Username"] = reqData["Username"]
            newData["Challenge"] = newData["Id"]
            accept_challenge_serializer = AcceptChallengeSerializer(
                data=newData)
            if accept_challenge_serializer.is_valid():
                accept_challenge_serializer.save()
                return JsonResponse("Challenge Accepted", safe=False)
            return JsonResponse("Failed", safe=False)
        return JsonResponse("Challenge Not Found", safe=False)
    elif request.method == "GET":
        reqData = JSONParser().parse(request)
        ChallengeData = AcceptChallenge.objects.filter(
            Username_id=reqData["Username"])
        if ChallengeData:
            accept_challenge_serializer = AcceptChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse(accept_challenge_serializer.data, safe=False)
        return JsonResponse("No Challenge Found", safe=False)
    elif request.method == "PUT":
        reqData = JSONParser().parse(request)
        UserData = Signup.objects.filter(
            Id=reqData["Username"])
        if not UserData:
            return JsonResponse("Unauthorized User", safe=False)
        AcceptedChallengeData = AcceptChallenge.objects.filter(
            Username_id=reqData["Username"], Id=reqData["Id"])
        if AcceptedChallengeData:
            newTask = {"CurrentTask": reqData["CurrentTask"]}
            accept_challenge_serializer = AcceptChallengeSerializer(
                AcceptedChallengeData, data=newTask)
            if accept_challenge_serializer.is_valid():
                accept_challenge_serializer.save()
                return JsonResponse("Update Sucessfully", safe=False)
            return JsonResponse("Failed", safe=False)
        return JsonResponse("Challenge Not Found", safe=False)


@ csrf_exempt
def completeChallengeApi(request):
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
                return JsonResponse("Challenge Completed", safe=False)
            return JsonResponse("Failed", safe=False)
        return JsonResponse("Challenge Not Found", safe=False)
    elif request.method == "GET":
        reqData = JSONParser().parse(request)
        ChallengeData = CompleteChallenge.objects.filter(
            Username_id=reqData["Username"])
        if ChallengeData:
            complete_challenge_serializer = CompleteChallengeSerializer(
                ChallengeData, many=True)
            return JsonResponse(complete_challenge_serializer.data, safe=False)
        return JsonResponse("No Challenge Found", safe=False)


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
