from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db.models import Max
from django.http import HttpResponseRedirect, JsonResponse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
import json

from .models import User, Score


# Create your views here.
def index(request):
    if request.user.is_authenticated:
        name = request.user.username
        tag = f"@{name.lower().replace(" ","")}"
        date = request.user.date_joined.date()

      
        if request.method == "POST":
            userImage = request.FILES.get("userImage")

            if request.user.image:
                request.user.image.delete()

            request.user.image = userImage
            request.user.save()
            


        return render(request, "hangman/index.html", {
            "user": request.user,
            "date": date,
            "name": name,
            "tag": tag,
        })

    else:
        return render(request, "hangman/login.html")

@csrf_exempt
def scoreGet(request):
    score = Score.objects.all().order_by('-score')

    score_list = [{"score": s.score, "user": s.name.username, "mode": s.mode, "img": s.name.image.url} for s in score]

    return JsonResponse({
        "Score": score_list,

    })

@csrf_exempt
def highScore(request):
    name = request.user.username

    easy = Score.objects.filter(name__username=name, mode="EASY").aggregate(Max('score'))
    med = Score.objects.filter(name__username=name, mode="MEDIUM").aggregate(Max('score'))
    hard = Score.objects.filter(name__username=name, mode="HARD").aggregate(Max('score'))
        
    if easy['score__max'] is None:
        high_easy = "N/A"
    else:
        high_easy = easy['score__max']

    if med['score__max'] is None:
        high_med = "N/A"
    else: 
        high_med = med['score__max']

    if hard['score__max'] is None:
        high_hard = "N/A"
    else:
        high_hard = hard['score__max']  

    return JsonResponse({
        "easy": high_easy,
        "med": high_med,
        "hard": high_hard,
    })


@csrf_exempt
def scoreRequest(request):
    if request.method == "POST":
        name = request.user
        data = json.loads(request.body)

        user_score = data.get('userScore')
        user_mode = data.get('userMode')
        
        Score.objects.create(score=user_score, name=name, mode=user_mode)

        return JsonResponse({
            "name": request.user.username,
            "score": user_score,
            "mode": user_mode,
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
