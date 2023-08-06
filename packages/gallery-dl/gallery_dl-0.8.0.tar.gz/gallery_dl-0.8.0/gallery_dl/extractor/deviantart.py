# -*- coding: utf-8 -*-

# Copyright 2015-2017 Mike Fährmann
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 2 as
# published by the Free Software Foundation.

"""Extract images from http://www.deviantart.com/"""

from .common import Extractor, Message
from .. import text, exception
from ..cache import cache
import time


class DeviantartUserExtractor(Extractor):
    """Extractor for all works from an artist on deviantart.com"""
    category = "deviantart"
    subcategory = "user"
    directory_fmt = ["{category}", "{username}"]
    filename_fmt = "{category}_{index}_{title}.{extension}"
    pattern = [r"(?:https?://)?([^\.]+)\.deviantart\.com(?:/gallery)?/?$"]
    test = [("http://shimoda7.deviantart.com/gallery/", {
        "url": "63bfa8efba199e27181943c9060f6770f91a8441",
        "keyword": "4ffe227a50f373faf643d7e5ae89a04859af8d19",
    })]

    def __init__(self, match):
        Extractor.__init__(self)
        self.api = DeviantartAPI(self)
        self.user = match.group(1)
        self.offset = 0

    def skip(self, num):
        self.offset += num
        return num

    def items(self):
        first = True
        yield Message.Version, 1
        for deviation in self.api.gallery_all(self.user, self.offset):
            if "content" not in deviation:
                continue
            if first:
                first = False
                yield Message.Directory, deviation["author"]
            del deviation["stats"]
            deviation["index"] = deviation["url"].rsplit("-", maxsplit=1)[-1]
            yield Message.Url, deviation["content"]["src"], deviation


class DeviantartImageExtractor(Extractor):
    """Extractor for single images from deviantart.com"""
    category = "deviantart"
    subcategory = "image"
    directory_fmt = ["{category}", "{artist}"]
    filename_fmt = "{category}_{index}_{title}.{extension}"
    pattern = [r"(?:https?://)?([^\.]+\.deviantart\.com/art/.+-(\d+))"]
    test = [(("http://shimoda7.deviantart.com/art/"
              "For-the-sake-of-a-memory-10073852"), {
        "url": "71345ce3bef5b19bd2a56d7b96e6b5ddba747c2e",
        "keyword": "ccac27b8f740fc943afca9460608e02c6cbcdf96",
        "content": "6a7c74dc823ebbd457bdd9b3c2838a6ee728091e",
    })]

    def __init__(self, match):
        Extractor.__init__(self)
        self.url = "https://" + match.group(1)
        self.index = match.group(2)
        self.session.cookies["agegate_state"] = "1"

    def items(self):
        page = self.request(self.url).text
        data = self.get_data(page)
        data.update(self.get_image(page))

        tlen = len(data["title"])
        text.nameext_from_url(data["image"], data)
        data["title"] = text.unescape(data["title"])
        data["description"] = text.unescape(text.unescape(data["description"]))
        data["artist"] = text.extract(data["url"], "//", ".")[0]
        data["date"] = text.extract(data["date"], ", ", " in ", tlen)[0]

        yield Message.Version, 1
        yield Message.Directory, data
        yield Message.Url, data["image"], data

    def get_data(self, page):
        """Collect metadata for extractor-job"""
        return text.extract_all(page, (
            ('title'      , '"og:title" content="', '"'),
            ('url'        , '"og:url" content="', '"'),
            ('description', '"og:description" content="', '"'),
            (None         , '<span class="tt-w">', ''),
            ('date'       , 'title="', '"'),
        ), values={"index": self.index})[0]

    def get_image(self, page):
        """Find image-url and -dimensions"""
        # try preview
        data, pos = text.extract_all(page, (
            ('image' , '"og:image" content="', '"'),
            ('width' , '"og:image:width" content="', '"'),
            ('height', '"og:image:height" content="', '"'),
        ))
        if data["image"].startswith("https://orig"):
            return data

        # try main image
        data, pos = text.extract_all(page, (
            (None    , 'class="dev-content-normal "', ''),
            ('image' , ' src="', '"'),
            ('width' , ' width="', '"'),
            ('height', ' height="', '"'),
        ), pos)
        if data["image"].startswith("https://orig"):
            return data

        # try download
        test, pos = text.extract(page, 'dev-page-download', '', pos)
        if test is not None:
            data, pos = text.extract_all(page, (
                ('image' , 'href="', '"'),
                (None    , '<span class="text">', ' '),
                ('width' , '', ' '),
                ('height', ' ', '<'),
            ), pos)
            response = self.session.head(text.unescape(data["image"]))
            data["image"] = response.headers["Location"]

        return data


class DeviantartAPI():
    """Minimal interface for the deviantart API"""
    def __init__(self, extractor, client_id="5388",
                 client_secret="76b08c69cfb27f26d6161f9ab6d061a1"):
        self.session = extractor.session
        self.session.headers["dA-minor-version"] = "20160316"
        self.log = extractor.log
        self.client_id = client_id
        self.client_secret = client_secret
        self.delay = 0

    def gallery_all(self, username, offset=0):
        """Yield all Deviation-objects of a specific user """
        url = "https://www.deviantart.com/api/v1/oauth2/gallery/all"
        params = {"username": username, "offset": offset, "limit": 10}
        while True:
            data = self._call(url, params)
            if "results" in data:
                yield from data["results"]
                if not data["has_more"]:
                    return
                params["offset"] = data["next_offset"]
            else:
                self.log.error("Unexpected API response: %s", data)
                return

    def authenticate(self):
        """Authenticate the application by requesting a bearer token"""
        bearer_token = self._authenticate_impl(
            self.client_id, self.client_secret
        )
        self.session.headers["Authorization"] = bearer_token

    @cache(maxage=3600, keyarg=1)
    def _authenticate_impl(self, client_id, client_secret):
        """Actual authenticate implementation"""
        url = "https://www.deviantart.com/oauth2/token"
        data = {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        }
        response = self.session.post(url, data=data)
        if response.status_code != 200:
            raise exception.AuthenticationError()
        return "Bearer " + response.json()["access_token"]

    def _call(self, url, params={}):
        """Call an API endpoint"""
        tries = 1
        while True:
            if self.delay:
                time.sleep(self.delay)

            self.authenticate()
            response = self.session.get(url, params=params)

            if response.status_code == 200:
                break
            elif response.status_code == 429:
                self.delay += 1
                self.log.debug("rate limit (delay: %d)", self.delay)
            else:
                self.delay = 1
                self.log.debug("http status code %d (%d/3)",
                               response.status_code, tries)
            tries += 1
            if tries > 3:
                raise Exception(response.text)
        try:
            return response.json()
        except ValueError:
            return {}
