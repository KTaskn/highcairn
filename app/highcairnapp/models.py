import base64
from io import BytesIO
import uuid
from PIL import Image as pilImage

from django.db import models
from .utilities import Resizer

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=30, blank=False, null=False)
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    public = models.BooleanField(default=False)

RESIZE_WIDTH = 600
RESIZE_HEIGHT = 600
class Image(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def create_thumbnail(self):
        from PIL import ImageFile 
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        # binary to pillow
        image = pilImage.open(BytesIO(self.content))

        # pillow resize
        w, h = image.size
        resizer = Resizer(RESIZE_WIDTH, RESIZE_HEIGHT)
        image_thumbnail = image.resize(resizer.calc(w, h))

        # pillow to binary
        bytes_thumbnail = BytesIO()
        image_thumbnail.save(bytes_thumbnail, format="PNG")
        return ImageThumbnail.objects.create(image=self, content=bytes_thumbnail.getvalue())

    @classmethod
    def create_from_base64(cls, content_base64):
        img_binary = base64.b64decode(content_base64)
        image = pilImage.open(BytesIO(img_binary))
        image.verify()
        return Image.objects.create(content=img_binary)

class ImageThumbnail(models.Model):
    image = models.ForeignKey(Image, primary_key=True, on_delete=models.CASCADE)
    content = models.BinaryField()

