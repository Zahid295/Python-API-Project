from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def index(request):
    
    return render(request, 'blog/index.html')

def posts(request):
    posts = Post.objects.all()
    return render(request, 'blog/posts.html', {'posts': posts})


