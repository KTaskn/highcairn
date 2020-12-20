from rest_framework import routers
from .views import PostViewSet, UserViewSet

router = routers.SimpleRouter()
router.register('posts', PostViewSet)
router.register('users', UserViewSet, basename='users')