from rest_framework import viewsets
from .models import Post
from .forms import PostForm
from .serializers import PostSerializer
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

# Create your views here.

def index(request):
    
    return render(request, 'blog/index.html')

def posts(request):
    posts = Post.objects.all()
    return render(request, 'blog/posts.html', {'posts': posts})

def post_detail(request, post_id):
    post = get_object_or_404(Post, pk=post_id)
    return render(request, 'blog/post_detail.html', {'post': post})

def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('blog/index.html')
    else:
        form = PostForm()
    return render(request, 'blog/create_posts.html', {'form': form})

from django.shortcuts import render, get_object_or_404
from .models import Post
from .forms import PostForm
from django.http import HttpResponseRedirect

def update_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect('/success-url/')
    else:
        form = PostForm(instance=post)
    return render(request, 'blog/post_form.html', {'form': form})
 

 
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('id')
    serializer_class = PostSerializer

