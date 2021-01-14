import base64
from io import BytesIO
from PIL import Image as pilImage

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Image

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        return super().create(validated_data)

class PostUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'public', 'created_at', 'updated_at')
    
    def create(self, validated_data):
        return super().create(validated_data)

class ImageUploadSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    content_base64 = serializers.CharField()

    def create(self, validated_data):
        content_base64 = validated_data.pop('content_base64')
        try:
            img_binary = base64.b64decode(content_base64)
            image = pilImage.open(BytesIO(img_binary))
            image.verify()
            img_obj = Image.objects.create(content=img_binary)        
            return {
                "content_base64": content_base64,
                "id": img_obj.id
            }
        except Exception as ex:
            raise serializers.ValidationError({
                "error": "The data is invalid.",
                "description": ex
            })
