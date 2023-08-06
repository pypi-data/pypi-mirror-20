from .utils import __hmac_sha1__
import time


def rtmp_publish_url(domain, hub, stream_title, mac, expire):
    path = "/%s/%s?e=%d" % (hub, stream_title, time.time()+expire)
    token = "%s:%s" % (mac.__auth__.access_key, __hmac_sha1__(path, mac.__auth__.secret_key))
    url = "rtmp://%s%s&token=%s" % (domain, path, token)
    return url


def rtmp_play_url(domain, hub, stream_title):
    return "rtmp://%s/%s/%s" % (domain, hub, stream_title)


def hls_play_url(domain, hub, stream_title):
    return "http://%s/%s/%s.m3u8" % (domain, hub, stream_title)


def hdl_play_url(domain, hub, stream_title):
    return "http://%s/%s/%s.flv" % (domain, hub, stream_title)


def snapshot_play_url(domain, hub, stream_title):
    return "http://%s/%s/%s.jpg" % (domain, hub, stream_title)
