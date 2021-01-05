import os
from django.http import HttpResponse, Http404
from django.template import loader
from .models import Post
from PIL import Image, ImageDraw, ImageFont
from io import BytesIO
import base64

STRIP_WIDTH = 1200
STRIP_HEIGHT = 630
FILE_FONT = '/resources/NotoSansJP-Light.otf'

# 文字を折り返す
def insert_return(text):
    if len(text) > 20:
        return text[:10] + "\n" + text[10:20] + "\n" + text[20:]
    elif len(text) > 10:
        return text[:10] + "\n" + text[10:20]
    else:
        return text

# テキストデータからogp画像をbase64で生成する
def make_ogp(text):
    # 画像を必要に応じて折り返す
    text = insert_return(text)
    
    # イメージデータを初期化
    im = Image.new("RGB", (STRIP_WIDTH, STRIP_HEIGHT), "#F4A7B9")
    draw = ImageDraw.Draw(im)

    # フォントを読み込む
    font = ImageFont.truetype(FILE_FONT, 90)
    # フォントの高さを計算する
    text_width, text_height = draw.textsize(text, font)
    # フォントの位置を計算する
    position = ((STRIP_WIDTH - text_width) / 2, (STRIP_HEIGHT - text_height) / 2 - 50)
    # 元画像にテキストを合成
    draw.text(position, text, font=font)

    # base64に変換
    buffer = BytesIO()
    im.save(buffer, format="PNG")
    return buffer.getvalue()

def ogp(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        binary = make_ogp(post.title)
        return HttpResponse(binary, content_type='image/png')
    except:
        raise Http404('Page does not exist.')