from django.http import HttpResponse, Http404
from .models import Image, ImageThumbnail
from PIL import Image as pilImage
from io import BytesIO

def get_image(request, image_uuid):
    try:
        image_obj = Image.objects.get(id=image_uuid)   
        return HttpResponse(image_obj.content, content_type='image/png')
    except:
        raise Http404('Page does not exist.')


def get_thumbnail(request, image_uuid):
    try:
        image_obj = ImageThumbnail.objects.get(image_id=image_uuid)   
        return HttpResponse(image_obj.content, content_type='image/png')
    except:
        raise Http404('Page does not exist.')