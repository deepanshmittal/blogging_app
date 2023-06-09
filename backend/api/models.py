from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    profile_img_url = models.URLField(null=True)
    username = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class Blog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=10)
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=10**6)
    blog_img_url = models.URLField(null=True)
    updated_on = models.DateTimeField(auto_now=True)
