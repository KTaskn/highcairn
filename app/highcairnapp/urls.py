from rest_framework import routers
from .views import PublicPostViewSet, CheckViewSet, PostViewSet

router = routers.SimpleRouter()
router.register('check', CheckViewSet, basename="check")
router.register('publicposts', PublicPostViewSet)
router.register('posts', PostViewSet)
urlpatterns = router.urls