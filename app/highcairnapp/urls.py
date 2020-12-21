from rest_framework import routers
from .views import PostViewSet, CheckViewSet

router = routers.SimpleRouter()
router.register('check', CheckViewSet, basename="check")
router.register('posts', PostViewSet)