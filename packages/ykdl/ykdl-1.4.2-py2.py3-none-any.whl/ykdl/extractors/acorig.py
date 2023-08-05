#!/usr/bin/env python
# -*- coding: utf-8 -*-

from .youkubase import YoukuBase
from .youkujs import install_acode

class Acorig(YoukuBase):
    name = u"AcFun 优酷合作视频"

    client_id = '908a519d032263f8'
    ct = 86
    refer = 'http://cdn.aixifan.com/player/sslhomura/AcNewPlayer20160705.swf'

    def setup(self, info):

        self.vid, self.embsig = self.vid

        info.title = self.name + "-" + self.vid

        install_acode('v', 'b', '1z4i', '86rv', 'ogb', 'ail')
        self.get_custom_sign()
        self.get_custom_stream()


site = Acorig()
