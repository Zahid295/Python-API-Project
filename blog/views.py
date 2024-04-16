from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse

# Create your views here.

def index(request):
    
    return render(request, 'blog/index.html')

def posts(request):
    posts = Post.objects.all()
    return render(request, 'blog/posts.html', {'posts': posts})

def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    return render(request, 'blog/post_detail.html', {'post': post})
