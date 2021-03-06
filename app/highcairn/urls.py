from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls import url

from highcairnapp.urls import router as approuter
from highcairnapp.sitemap import sitemap
from highcairnapp.ogp import ogp
from highcairnapp.image import get_image, get_thumbnail

schema_view = get_schema_view(
   openapi.Info(
      title="HighCairn",
      default_version='v0.01',
      description="",
      terms_of_service="",
      contact=openapi.Contact(email=""),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

# print(approuter)

urlpatterns = [
    url('^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url('^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url('^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/ogp/<int:post_id>/', ogp),
    path('api/image/<str:image_uuid>/', get_image),
    path('api/thumbnail/<str:image_uuid>/', get_thumbnail),
    path('api/sitemap.xml/', sitemap),
    path('api/admin/', admin.site.urls),
    path('api/', include(approuter.urls))
]