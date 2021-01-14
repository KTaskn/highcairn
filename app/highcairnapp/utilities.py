
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