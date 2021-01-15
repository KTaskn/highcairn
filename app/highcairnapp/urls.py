from rest_framework import routers
from .views import PublicPostViewSet, CheckViewSet, PostViewSet, ImageUploadViewSet

router = routers.SimpleRouter()
router.register('check', CheckViewSet, basename="check")
router.register('publicposts', PublicPostViewSet)
router.register('posts', PostViewSet)
router.register('imageupload', ImageUploadViewSet, basename="imageupload")
urlpatterns = router.urls