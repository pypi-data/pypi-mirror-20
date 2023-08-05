#!/usr/bin/env python
# -*- coding: utf-8 -*-

from PIL import ImageDraw
from PIL import ImageFont
from thumbor.filters import BaseFilter, filter_method

import logging

class Filter(BaseFilter):
    @filter_method(
        ur"(?:'.+?')|(?:[^,]+?)",#word
        BaseFilter.PositiveNumber,#posX
        BaseFilter.PositiveNumber,#posY
        BaseFilter.String,#color name see: http://pillow.readthedocs.io/en/4.0.x/reference/ImageColor.html#color-names
        BaseFilter.PositiveNumber, #font-size
        BaseFilter.String, #font-family
    )
    def text(self, word, x, y, color, font_size, font_family="Tahoma"):
        try:
            logging.info("Rendering text:" + word)
            image = self.engine.image
            usr_font = ImageFont.truetype(font_family, font_size)
            drawer = ImageDraw.Draw(image)
            drawer.text((x, y), word, fill=color, font=usr_font)
            self.engine.image = image
        except IOError:
            logging.error("Cannot find font:" + font_family)
            pass