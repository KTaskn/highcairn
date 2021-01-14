from django.db import models
import uuid

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=30, blank=False, null=False)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    public = models.BooleanField(default=False)

class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.BinaryField()
