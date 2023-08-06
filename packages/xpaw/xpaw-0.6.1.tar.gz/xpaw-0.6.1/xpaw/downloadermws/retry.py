# coding=utf-8

import logging

from xpaw.config import BaseConfig
from xpaw.errors import ResponseNotMatch, IgnoreRequest, NetworkError

log = logging.getLogger(__name__)


class RetryMiddleware:
    RETRY_ERRORS = (NetworkError, ResponseNotMatch)
    RETRY_HTTP_STATUS = (500, 502, 503, 504, 408)

    def __init__(self, max_retry_times, http_status):
        self._max_retry_times = max_retry_times
        self._http_status = http_status

    @classmethod
    def from_config(cls, config):
        c = config.get("retry")
        if c is None:
            c = {}
        c = BaseConfig(c)
        return cls(c.getint("max_retry_times", 3),
                   c.getlist("http_status", cls.RETRY_HTTP_STATUS))

    async def handle_response(self, request, response):
        for p in self._http_status:
            if self.match_status(p, response.status):
                return self.retry(request, "http status={}".format(response.status))

    @staticmethod
    def match_status(pattern, status):
        if isinstance(pattern, int):
            return pattern == status
        verse = False
        if pattern.startswith("!") or pattern.startswith("~"):
            verse = True
            pattern = pattern[1:]
        s = str(status)
        n = len(s)
        match = True
        if len(pattern) != n:
            match = False
        else:
            i = 0
            while i < n:
                if pattern[i] != "x" and pattern[i] != "X" and pattern[i] != s[i]:
                    match = False
                    break
                i += 1
        if verse:
            match = not match
        return match

    async def handle_error(self, request, error):
        if isinstance(error, self.RETRY_ERRORS):
            return self.retry(request, "{}: {}".format(type(error), error))

    def retry(self, request, reason):
        retry_times = request.meta.get("_retry_times", 0) + 1
        if retry_times <= self._max_retry_times:
            log.debug("We will retry the request(url={}) because of {}".format(request.url, reason))
            request.meta["_retry_times"] = retry_times
            return request.copy()
        else:
            log.info("The request(url={}) has been retried {} times,"
                     " and it will be aborted.".format(request.url, self._max_retry_times))
            raise IgnoreRequest()
