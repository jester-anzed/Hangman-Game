from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.core.paginator import Paginator
from django.views.generic import ListView
from django.http import HttpResponseRedirect, JsonResponse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json

from .models import User, Score


class PostContent(ListView):
    paginate_by = 10
    model = Score

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        name = request.user

        score = Score.objects.all().order_by('-score')

        paginator = Paginator(score, 10)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        page_count = paginator.page_range



        return render(request, "hangman/index.html", {
            "name": name,
            "count": page_count,
            "page_obj": page_obj,
        })

    else:
        return render(request, "hangman/login.html")



@csrf_exempt
def scoreGet(request):
    score = Score.objects.all().order_by('-score')

    score_list = [{"score": s.score, "user": s.name.username} for s in score]

    return JsonResponse({
        "Score": score_list,
    })

@csrf_exempt
def scoreRequest(request):
    if request.method == "POST":
        name = request.user
        data = json.loads(request.body)

        user_score = data.get('userScore')
        print(data)
        print(user_score)
    
        Score.objects.create(score=user_score, name=name)

        return JsonResponse({
            "name": request.user.username,
            "score": user_score,
        })
    

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "hangman/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "hangman/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "hangman/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "hangman/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "hangman/register.html")
