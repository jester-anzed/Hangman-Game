from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    image = models.ImageField(default="default.png", blank=True, upload_to="images/") 
    pass


class Score(models.Model):
    name = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    date = models.DateTimeField(default=timezone.now)
    mode = models.CharField(max_length=7)

    
    def __str__(self):
        return f"{self.name} - {self.score} - {self.mode}"