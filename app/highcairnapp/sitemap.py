import os
from django.http import HttpResponse
from django.template import loader
from .models import Post

def sitemap(request):
    posts = Post.objects.filter(public=True).all()
    template = loader.get_template('sitemap.xml')
    context = {
        'posts': posts,
        'host': os.environ['WEB_HOST']
    }
    response = HttpResponse(template.render(context, request), content_type='text/xml; charset=utf-8')
    return response