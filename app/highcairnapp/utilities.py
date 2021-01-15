import base64
from PIL import Image
from io import BytesIO

# 画像を縦横比そのままにリサイズするためのメソッド
class Resizer:
    def __init__(self, max_width, max_height):
        self.max_width = max_width
        self.max_height = max_height

    def calc(self, width, height):
        ratio = 1.0

        if self.max_width <= width and width >= height:
            ratio = width / self.max_width
        elif self.max_height <= height:
            ratio = height / self.max_height
        else:
            ratio = 1.0

        return int(width / ratio), int(height / ratio)

# BASE64の画像を画像バイナリに変換する
class Converter:
    def __init__(self, format="PNG"):
        self.format = format

    def convert(self, content_base64):
        from PIL import ImageFile 
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        
        img_binary = base64.b64decode(content_base64)
        image = Image.open(BytesIO(img_binary))
        image = image.resize(image.size)
        bytes_thumbnail = BytesIO()
        image.save(bytes_thumbnail, format=self.format)
        return bytes_thumbnail