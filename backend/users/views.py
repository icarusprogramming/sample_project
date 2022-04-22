from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import User

import json
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)

@csrf_exempt  
def add(request):
    #add new user
    bodyData = json.loads(request.body)
    newUser = User(name=bodyData["name"])
    newUser.save()
    #send back updated list of users
    users = serializers.serialize("json", User.objects.all())
    return HttpResponse(users)
