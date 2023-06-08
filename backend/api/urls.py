from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('register', RegisterUser.as_view()),
    path('login', LoginUser.as_view()),
    path('logout', LogoutUser.as_view()),
    path('posts', Posts.as_view()),
    path('post/<int:id>', SinglePost.as_view()),
    path('post', SinglePost.as_view()),
    # path('home', Home.as_view()),
]
