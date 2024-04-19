from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import render, get_object_or_404
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


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('id')
    serializer_class = PostSerializer

@csrf_exempt

def create_posts(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        post = Post.objects.create(
            title=data.get('title'),
            content=data.get('content'),
            author=request.user,  # Assuming the user is logged in
            # Add other fields as needed
        )
        return JsonResponse({'message': 'Post created successfully', 'post_id': post.id}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
    