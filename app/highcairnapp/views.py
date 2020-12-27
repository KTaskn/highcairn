from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import filters

from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from rest_framework import mixins, generics
from .models import Post
from .serializers import PostSerializer, PostUpdateSerializer

class CheckViewSet(viewsets.ViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def list(self, request):
        return Response({"result": True})

class PublicPostViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = Post.objects.filter(public=True).all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']
    ordering = ['id']
    serializer_class = PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Post.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['id']
    ordering = ['id']
    serializer_class = PostUpdateSerializer
    