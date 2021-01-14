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
    id = serializers.UUIDField(read_only = True)
    content_base64 = serializers.CharField(write_only = True)

    def create(self, validated_data):
        content_base64 = validated_data.pop('content_base64')
        try:
            image_obj = Image.create_from_base64(content_base64)
            thumbnail_obj = image_obj.create_thumbnail()
            return {
                "id": image_obj.id
            }
        except Exception as ex:
            raise serializers.ValidationError({
                "error": "The data is invalid.",
                "description": ex
            })
