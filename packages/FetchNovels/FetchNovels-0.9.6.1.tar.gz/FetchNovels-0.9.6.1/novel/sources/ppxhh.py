#!/usr/bin/env python
# -*- coding: utf-8 -*-

from pyquery import PyQuery

from novel import serial, utils, config

BASE_URL = 'http://www.ppxhh.com/{}/'


class Ppxhh(serial.SerialNovel):

    def __init__(self, tid):
        super().__init__(utils.base_to_url(BASE_URL, tid), '#bfick',
                         chap_type=serial.ChapterType.last,
                         chap_sel='#bsiah dd',
                         tid=tid)
        self.encoding = config.GB

    def get_intro(self):
        intro = self.doc('meta').filter(
            lambda i, e: PyQuery(e).attr('property') == 'og:description'
        ).attr('content')
        intro = self.refine(intro)
        return intro

    def get_title_and_author(self):
        name = self.doc('meta').filter(
            lambda i, e: PyQuery(e).attr('name') == 'og:novel:book_name'
        ).attr('content')

        author = self.doc('meta').filter(
            lambda i, e: PyQuery(e).attr('name') == 'og:novel:author'
        ).attr('content')

        return name, author
