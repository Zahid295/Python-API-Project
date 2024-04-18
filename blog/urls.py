from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('blog/posts/', views.posts, name='posts'),
    path('posts/<int:post_id>/', views.post_detail, name='post_detail'),
]

