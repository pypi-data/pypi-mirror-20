#!/usr/bin/env python3

""" Browse & play embedded tracks from Angry Metal Guy music reviews. """

__version__ = "0.3.16"
__author__ = "desbma"
__license__ = "GPLv3"

import argparse
import base64
import collections
import contextlib
import datetime
import enum
import io
import itertools
import json
import locale
import logging
import operator
import os
import re
import shutil
import shelve
import string
import subprocess
import tempfile
import urllib.parse
import webbrowser

from amg import colored_logging
from amg import mkstemp_ctx
from amg import sanitize

import appdirs
import cursesmenu
import lxml.cssselect
import lxml.etree
import mutagen
import mutagen.easyid3
import PIL.Image
import requests
import web_cache
import youtube_dl


PlayerMode = enum.Enum("PlayerMode",
                       ("MANUAL", "RADIO", "DISCOVER"))
ReviewMetadata = collections.namedtuple("ReviewMetadata",
                                        ("url",
                                         "artist",
                                         "album",
                                         "cover_thumbnail_url",
                                         "cover_url",
                                         "date_published",
                                         "tags"))

ROOT_URL = "https://www.angrymetalguy.com/"
LAST_PLAYED_EXPIRATION_DAYS = 365
HTML_PARSER = lxml.etree.HTMLParser()
REVIEW_BLOCK_SELECTOR = lxml.cssselect.CSSSelector("article.tag-review")
REVIEW_LINK_SELECTOR = lxml.cssselect.CSSSelector(".entry-title a")
REVIEW_COVER_SELECTOR = lxml.cssselect.CSSSelector("img.wp-post-image")
REVIEW_DATE_SELECTOR = lxml.cssselect.CSSSelector("div.metabar-pad time.published")
PLAYER_IFRAME_SELECTOR = lxml.cssselect.CSSSelector("div.entry_content iframe")
BANDCAMP_JS_SELECTOR = lxml.cssselect.CSSSelector("html > head > script")
TCP_TIMEOUT = 9.1


def fetch_page(url, *, http_cache=None):
  """ Fetch page & parse it with LXML. """
  if (http_cache is not None) and (url in http_cache):
    logging.getLogger().info("Got data for URL '%s' from cache" % (url))
    page = http_cache[url]
  else:
    logging.getLogger().debug("Fetching '%s'..." % (url))
    response = requests.get(url, timeout=TCP_TIMEOUT)
    response.raise_for_status()
    page = response.content
    if http_cache is not None:
      http_cache[url] = page
  return lxml.etree.XML(page.decode("utf-8"), HTML_PARSER)


def fetch_ressource(url, dest_filepath):
  """ Fetch ressource, and write it to file. """
  logging.getLogger().debug("Fetching '%s'..." % (url))
  with contextlib.closing(requests.get(url, timeout=TCP_TIMEOUT, stream=True)) as response:
    response.raise_for_status()
    with open(dest_filepath, "wb") as dest_file:
      for chunk in response.iter_content(2 ** 14):
        dest_file.write(chunk)


def parse_review_block(review):
  """ Parse review block from main page and return a ReviewMetadata object. """
  tags = tuple(t.split("-", 1)[1] for t in review.get("class").split(" ") if (t.startswith("tag-") and
                                                                              not t.startswith("tag-review") and
                                                                              not t.split("-", 1)[1].isdigit()))
  review_link = REVIEW_LINK_SELECTOR(review)[0]
  url = review_link.get("href")
  title = lxml.etree.tostring(review_link, encoding="unicode", method="text").strip()
  expected_suffix = " Review"
  if title.endswith(expected_suffix):
    title = title[:len(title) - len(expected_suffix)]
  elif "[Things You Might Have Missed" in title:
    title = title.rsplit("[", 1)[0].strip()
  try:
    artist, album = map(str.strip, title.split("–", 1))
  except ValueError:
    # most likely not a review, ie. http://www.angrymetalguy.com/ep-edition-things-you-might-have-missed-2016/
    return None
  def make_absolute_url(url):
    url_parts = urllib.parse.urlsplit(url)
    if url_parts.scheme:
      return url
    url_parts = ("https",) + url_parts[1:]
    return urllib.parse.urlunsplit(url_parts)
  review_img = REVIEW_COVER_SELECTOR(review)[0]
  cover_thumbnail_url = make_absolute_url(review_img.get("src"))
  srcset = review_img.get("srcset")
  if srcset is not None:
    cover_url = make_absolute_url(srcset.split(" ")[-2])
  else:
    cover_url = None
  published = REVIEW_DATE_SELECTOR(review)[0].get("datetime")
  published = datetime.datetime.strptime(published, "%Y-%m-%dT%H:%M:%S+00:00")
  return ReviewMetadata(url, artist, album, cover_thumbnail_url, cover_url, published, tags)


def get_reviews():
  """ Parse site and yield ReviewMetadata objects. """
  previous_review = None
  for i in itertools.count():
    url = ROOT_URL if (i == 0) else "%spage/%u" % (ROOT_URL, i + 1)
    page = fetch_page(url)
    for review in REVIEW_BLOCK_SELECTOR(page):
      r = parse_review_block(review)
      if (r is not None) and (r != previous_review):
        yield r
        previous_review = r


def get_embedded_track(page, http_cache):
  """ Parse page and extract embedded track. """
  urls = None
  audio_only = False
  try:
    try:
      iframe = PLAYER_IFRAME_SELECTOR(page)[0]
    except IndexError:
      pass
    else:
      iframe_url = iframe.get("src")
      if iframe_url is not None:
        yt_prefix = "https://www.youtube.com/embed/"
        bc_prefix = "https://bandcamp.com/EmbeddedPlayer/"
        sc_prefix = "https://w.soundcloud.com/player/"
        if iframe_url.startswith(yt_prefix):
          yt_id = iframe_url[len(yt_prefix):]
          urls = ("https://www.youtube.com/watch?v=%s" % (yt_id),)
        elif iframe_url.startswith(bc_prefix):
          iframe_page = fetch_page(iframe_url, http_cache=http_cache)
          js = BANDCAMP_JS_SELECTOR(iframe_page)[-1].text
          js = next(filter(operator.methodcaller("__contains__",
                                                 "var playerdata ="),
                           js.split("\n")))
          js = js.split("=", 1)[1].rstrip(";" + string.whitespace)
          js = json.loads(js)
          # import pprint
          # pprint.pprint(js)
          # exit(7)
          urls = tuple(t["title_link"] for t in js["tracks"] if (t["track_streaming"] and t["file"]))
          audio_only = True
        elif iframe_url.startswith(sc_prefix):
          urls = (iframe_url.split("&", 1)[0],)
          audio_only = True
  except Exception as e:
    logging.getLogger().error("%s: %s" % (e.__class__.__qualname__, e))
  if urls is not None:
    logging.getLogger().debug("Track URL(s): %s" % (" ".join(urls)))
  return urls, audio_only


class KnownReviews:

  class DataIndex(enum.IntEnum):
    LAST_PLAYED = 0
    PLAY_COUNT = 1
    DATA_INDEX_COUNT = 2

  def __init__(self):
    data_dir = appdirs.user_data_dir("amg-player")
    os.makedirs(data_dir, exist_ok=True)
    filepath = os.path.join(data_dir, "played.dat")
    self.data = shelve.open(filepath, protocol=3)
    # cleanup old entries
    now = datetime.datetime.now()
    to_del = []
    for url, (last_played, *_) in self.data.items():
      delta = now - last_played
      if delta.days > LAST_PLAYED_EXPIRATION_DAYS:
        to_del.append(url)
    for url in to_del:
      del self.data[url]

  def isKnownUrl(self, url):
    """ Return True if url if from a known review, False instead. """
    return url in self.data

  def setLastPlayed(self, url):
    """ Memorize a review's track has been read. """
    try:
      e = list(self.data[url])
    except KeyError:
      e = []
    if len(e) < __class__.DataIndex.DATA_INDEX_COUNT:
      e.extend(None for _ in range(__class__.DataIndex.DATA_INDEX_COUNT - len(e)))
    try:
      e[__class__.DataIndex.PLAY_COUNT] += 1
    except TypeError:
      # be compatible with when play count was not stored
      e[__class__.DataIndex.PLAY_COUNT] = 2 if e[__class__.DataIndex.LAST_PLAYED] is not None else 1
    e[__class__.DataIndex.LAST_PLAYED] = datetime.datetime.now()
    self.data[url] = tuple(e)

  def getLastPlayed(self, url):
    """ Return datetime of last review track playback. """
    return self.data[url][__class__.DataIndex.LAST_PLAYED]

  def getPlayCount(self, url):
    """ Return number of time a track has been played. """
    try:
      return self.data[url][__class__.DataIndex.PLAY_COUNT]
    except IndexError:
      # be compatible with when play count was not stored
      return 1


def get_cover_data(review):
  """ Fetch cover and return buffer of JPEG data. """
  cover_url = review.cover_url if review.cover_url is not None else review.cover_thumbnail_url
  cover_ext = os.path.splitext(urllib.parse.urlsplit(cover_url).path)[1][1:].lower()

  with mkstemp_ctx.mkstemp(suffix=".%s" % (cover_ext)) as filepath:
    fetch_ressource(cover_url, filepath)

    if cover_ext == "png":
      # convert to JPEG
      img = PIL.Image.open(filepath)
      f = io.BytesIO()
      img.save(f, format="JPEG", quality=90, optimize=True)
      f.seek(0)
      out_bytes = f.read()
    else:
      if shutil.which("jpegoptim"):
        cmd = ("jpegoptim", "-q", "--strip-all", filepath)
        subprocess.check_call(cmd)
      with open(filepath, "rb") as f:
        out_bytes = f.read()

  return out_bytes


def download_and_merge(review, track_urls, tmp_dir, cover_filepath):
  """ Download track, and return ffmpeg process that outputs merged audio & album art, ot None if download failed. """
  # fetch audio
  # https://github.com/rg3/youtube-dl/blob/master/youtube_dl/YoutubeDL.py#L121-L269
  ydl_opts = {"outtmpl": os.path.join(tmp_dir, r"%(autonumber)s.%(ext)s")}
  try:
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
      ydl.download(track_urls)
  except youtube_dl.utils.DownloadError as e:
    # already logged
    # logging.getLogger().warning("Download error : %s" % (e))
    pass
  audio_filepaths = os.listdir(tmp_dir)
  audio_filepaths.sort()
  if not audio_filepaths:
    logging.getLogger().error("Download failed")
    return
  concat_filepath = tempfile.mktemp(dir=tmp_dir, suffix=".txt")
  with open(concat_filepath, "wt") as concat_file:
    for audio_filepath in audio_filepaths:
      concat_file.write("file %s\n" % (audio_filepath))

  # merge
  cmd = (shutil.which("ffmpeg") or shutil.which("avconv"),
         "-loglevel", "quiet",
         "-loop", "1", "-framerate", "1", "-i", cover_filepath,
         "-f", "concat", "-i", concat_filepath,
         "-map", "0:v", "-map", "1:a",
         "-filter:v", "scale=trunc(iw/2)*2:trunc(ih/2)*2",
         "-c:a", "copy",
         "-c:v", "libx264", "-crf", "18", "-tune:v", "stillimage", "-preset", "ultrafast",
         "-shortest",
         "-f", "matroska", "-")
  logging.getLogger().debug("Merging Audio and image with command: %s" % (subprocess.list2cmdline(cmd)))
  return subprocess.Popen(cmd, stdout=subprocess.PIPE, cwd=tmp_dir)


def normalize_title_tag(title, artist):
  """ Remove useless prefix and suffix from title tag string. """
  original_title = title

  # basic string funcs
  rclean_chars = list(string.punctuation)
  for c in "!?)":
    rclean_chars.remove(c)
  rclean_chars = str(rclean_chars) + string.whitespace
  def rclean(s):
    return s.rstrip(rclean_chars)
  def endslike(s, l):
    return s.rstrip(string.punctuation).lower().endswith(l)
  def rmsuffix(s, e):
    return s.rstrip(string.punctuation)[:-len(e)]

  title = rclean(title.strip(string.whitespace))

  # build list of common suffixes
  suffixes = []
  suffix_words1 = ("", "official", "new")
  suffix_words2 = ("", "video", "music", "track", "lyric", "album")
  suffix_words3 = ("video", "track", "premiere", "version", "clip", "audio")
  for w1 in suffix_words1:
    for w2 in suffix_words2:
      for w3 in suffix_words3:
        if (w1 or w2) and (w3 != w2):
          for rsep in (" ", ""):
            rpart = rsep.join((w2, w3)).strip()
            suffixes.append(" ".join((w1, rpart)).strip())
  suffixes.extend(("pre-orders available", "preorders available", "hd", "official"))
  year = datetime.datetime.today().year
  for y in range(year - 5, year + 1):
    suffixes.append(str(y))
  suffixes.sort(key=len, reverse=True)

  # detect and remove  'taken from album xxx, out on yyy' suffix
  match = re.search("taken from .*, out on", title, re.IGNORECASE)
  if match:
    new_title = rclean(title[:match.start(0)])
    if new_title:
      title = new_title

  loop = True
  while loop:
    loop = False
    for suffix in suffixes:
      # detect and remove common suffixes
      if endslike(title, suffix):
        title = rclean(rmsuffix(title, suffix))
        loop = True
        break

      # detect and remove 'xxx records' suffix
      suffix = "records"
      if endslike(title, suffix):
        new_title = rclean(rmsuffix(title, suffix))
        new_title = rclean(" ".join(new_title.split()[:-1]))
        if new_title:
          title = new_title
          loop = True
          break

  # detect and remove artist prefix
  if title.lower().startswith(artist.lower()):
    new_title = title[len(artist):]
    new_title = new_title.lstrip(string.punctuation + string.whitespace)
    if new_title:
      title = new_title
  elif title.lower().startswith(artist.replace(" ", "").lower()):
    new_title = title[len(artist.replace(" ", "")):]
    new_title = new_title.lstrip(string.punctuation + string.whitespace)
    if new_title:
      title = new_title

  # normalize case
  title = sanitize.normalize_tag_case(title)

  if title != original_title:
    logging.getLogger().debug("Fixed title tag: '%s' -> '%s'" % (original_title, title))

  return title


def tag(track_filepath, review, cover_data):
  """ Tag an audio file. """
  mf = mutagen.File(track_filepath)
  if isinstance(mf, mutagen.ogg.OggFileType):
    # override/fix source tags added by youtube-dl, because they often contain crap
    mf["artist"] = sanitize.normalize_tag_case(review.artist)
    mf["album"] = sanitize.normalize_tag_case(review.album)
    try:
      mf["title"] = normalize_title_tag(mf["title"][0], review.artist)
    except KeyError:
      pass
    mf.save()
    # embed album art
    picture = mutagen.flac.Picture()
    picture.data = cover_data
    picture.type = mutagen.id3.PictureType.COVER_FRONT
    picture.mime = "image/jpeg"
    encoded_data = base64.b64encode(picture.write())
    mf["metadata_block_picture"] = encoded_data.decode("ascii")
    mf.save()
  elif isinstance(mf, mutagen.mp3.MP3):
    # override/fix source tags added by youtube-dl, because they often contain crap
    mf = mutagen.easyid3.EasyID3(track_filepath)
    mf["artist"] = sanitize.normalize_tag_case(review.artist)
    mf["album"] = sanitize.normalize_tag_case(review.album)
    try:
      mf["title"] = normalize_title_tag(mf["title"][0], review.artist)
    except KeyError:
      pass
    mf.save()
    # embed album art
    mf = mutagen.File(track_filepath)
    mf.tags.add(mutagen.id3.APIC(mime="image/jpeg",
                                 type=mutagen.id3.PictureType.COVER_FRONT,
                                 data=cover_data))
    mf.save()
  elif isinstance(mf, mutagen.mp4.MP4):
    # override/fix source tags added by youtube-dl, because they often contain crap
    mf["\xa9ART"] = sanitize.normalize_tag_case(review.artist)
    mf["\xa9alb"] = sanitize.normalize_tag_case(review.album)
    try:
      mf["\xa9nam"] = normalize_title_tag(mf["\xa9nam"][0], review.artist)
    except KeyError:
      pass
    mf.save()
    # embed album art
    mf["covr"] = [mutagen.mp4.MP4Cover(cover_data,
                                       imageformat=mutagen.mp4.AtomDataType.JPEG)]
    mf.save()


def download_audio(review, track_urls):
  """ Download track audio to file in current directory, return True if success. """
  with tempfile.TemporaryDirectory() as tmp_dir:
    logging.getLogger().info("Downloading audio for track(s) %s" % (" ".join(track_urls)))
    ydl_opts = {"outtmpl": os.path.join(tmp_dir,
                                        ("%s-" % (review.date_published.strftime("%Y%m%d%H%M%S"))) +
                                        r"%(autonumber)s" +
                                        (". %s - %s" % (sanitize.sanitize_for_path(review.artist.replace(os.sep, "_")),
                                                        sanitize.sanitize_for_path(review.album.replace(os.sep, "_")))) +
                                        r".%(ext)s"),
                "format": "opus/vorbis/bestaudio",
                "postprocessors": [{"key": "FFmpegExtractAudio"},
                                   {"key": "FFmpegMetadata"}],
                "socket_timeout": TCP_TIMEOUT}
    try:
      with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download(track_urls)
    except youtube_dl.utils.DownloadError as e:
      # already logged
      # logging.getLogger().warning("Download error : %s" % (e))
      pass
    track_filepaths = tuple(map(lambda x: os.path.join(tmp_dir, x),
                                os.listdir(tmp_dir)))
    if not track_filepaths:
      logging.getLogger().error("Download failed")
      return False

    # get cover
    cover_data = get_cover_data(review)

    # add tags & embed cover
    for track_filepath in track_filepaths:
      try:
        tag(track_filepath, review, cover_data)
      except Exception as e:
        logging.getLogger().warning("Failed to add tags to file '%s': %s" % (track_filepath,
                                                                             e.__class__.__qualname__))

    # move tracks
    for track_filepath in track_filepaths:
      shutil.move(track_filepath, os.getcwd())

    return True


def play(review, track_urls, *, merge_with_picture):
  """ Play it fucking loud! """
  # TODO support other players (vlc, avplay, ffplay...)
  merge_with_picture = merge_with_picture and ((shutil.which("ffmpeg") is not None) or
                                               (shutil.which("avconv") is not None))
  if merge_with_picture:
    with mkstemp_ctx.mkstemp(suffix=".jpg") as cover_filepath:
      cover_data = get_cover_data(review)
      with open(cover_filepath, "wb") as f:
        f.write(cover_data)

      with tempfile.TemporaryDirectory() as tmp_dir,\
              download_and_merge(review, track_urls, tmp_dir, cover_filepath) as merge_process:
        if merge_process is None:
          return
        cmd = ("mpv", "--force-seekable=yes", "-")
        logging.getLogger().debug("Playing with command: %s" % (subprocess.list2cmdline(cmd)))
        subprocess.check_call(cmd, stdin=merge_process.stdout)
        merge_process.terminate()

  else:
    for track_url in track_urls:
      cmd_dl = ("youtube-dl", "-o", "-", track_url)
      logging.getLogger().debug("Downloading with command: %s" % (subprocess.list2cmdline(cmd_dl)))
      dl_process = subprocess.Popen(cmd_dl,
                                    stdout=subprocess.PIPE,
                                    stderr=subprocess.DEVNULL)
      cmd = ("mpv", "--force-seekable=yes", "-")
      logging.getLogger().debug("Playing with command: %s" % (subprocess.list2cmdline(cmd)))
      subprocess.check_call(cmd, stdin=dl_process.stdout)


class AmgMenu(cursesmenu.CursesMenu):

  """ Custom menu to choose review/track. """

  UserAction = enum.Enum("ReviewAction", ("DEFAULT", "OPEN_REVIEW", "DOWNLOAD_AUDIO"))

  def __init__(self, *, reviews, known_reviews, http_cache, mode, selected_idx):
    menu_subtitle = {PlayerMode.MANUAL: "Select a track",
                     PlayerMode.RADIO: "Select track to start from"}
    super().__init__("AMG Player v%s" % (__version__),
                     "%s mode: %s "
                     "(ENTER to play, "
                     "d to download audio, "
                     "r to open review, "
                     "q to exit)" % (mode.name.capitalize(),
                                     menu_subtitle[mode]),
                     True)
    if selected_idx is not None:
      self.current_option = selected_idx
    review_strings = __class__.reviewsToStrings(reviews, known_reviews, http_cache)
    for index, (review, review_string) in enumerate(zip(reviews, review_strings)):
      self.append_item(ReviewItem(review, review_string, index, self))

  def process_user_input(self):
    """ Override key handling to add "open review" and "quick exit" features.

    See cursesmenu.CursesMenu.process_user_input
    """
    self.user_action = __class__.UserAction.DEFAULT
    c = super().process_user_input()
    if c in frozenset(map(ord, "rR")):
      self.user_action = __class__.UserAction.OPEN_REVIEW
      self.select()
    elif c in frozenset(map(ord, "dD")):
      # select last item (exit item)
      self.user_action = __class__.UserAction.DOWNLOAD_AUDIO
      self.select()
    elif c in frozenset(map(ord, "qQ")):
      # select last item (exit item)
      self.current_option = len(self.items) - 1
      self.select()

  def get_last_user_action(self):
    """ Return last user action when item was selected. """
    return self.user_action

  @staticmethod
  def reviewsToStrings(reviews, known_reviews, http_cache):
    """ Generate a list of string representations of reviews. """
    lines = []
    for i, review in enumerate(reviews):
      try:
        play_count = known_reviews.getPlayCount(review.url)
        played = "Last played: %s (%u time%s)" % (known_reviews.getLastPlayed(review.url).strftime("%x %H:%M"),
                                                  play_count,
                                                  "s" if play_count > 1 else "")
      except KeyError:
        if review.url in http_cache:
          review_page = fetch_page(review.url, http_cache=http_cache)
          if get_embedded_track(review_page, http_cache)[0] is None:
            played = "No track"
          else:
            played = "Last played: never"
        else:
          played = "Last played: never"
      lines.append(("%s - %s" % (review.artist, review.album),
                    "Published: %s" % (review.date_published.strftime("%x")),
                    played))
    # auto align/justify
    max_lens = [0] * len(lines[0])
    for line in lines:
      for i, s in enumerate(line):
        if len(s) > max_lens[i]:
          max_lens[i] = len(s)
    sep = "\t"
    for i, line in enumerate(lines):
      lines[i] = "%s%s" % (" " if i < 9 else "",
                           sep.join(s.ljust(max_len) for s, max_len in zip(line, max_lens)))
    return lines

  @staticmethod
  def setupAndShow(mode, reviews, known_reviews, http_cache, selected_idx=None):
    """ Setup and display interactive menu, return selected review index or None if exist requested. """
    menu = AmgMenu(reviews=reviews,
                   known_reviews=known_reviews,
                   http_cache=http_cache,
                   mode=mode,
                   selected_idx=selected_idx)
    menu.show()
    idx = menu.selected_option
    return None if (idx == len(reviews)) else (idx, menu.get_last_user_action())


class ReviewItem(cursesmenu.items.SelectionItem):

  """ Custom menu item (menu line), overriden to support several actions per item. """

  def __init__(self, review, review_string, index, menu):
    super().__init__(review_string, index, menu)
    self.review = review

  def action(self):
    if self.menu.get_last_user_action() is AmgMenu.UserAction.OPEN_REVIEW:
      webbrowser.open_new_tab(self.review.url)
      self.should_exit = False
    else:
      self.should_exit = True


def cl_main():
  # parse args
  arg_parser = argparse.ArgumentParser(description="AMG Player v%s. %s" % (__version__, __doc__),
                                       formatter_class=argparse.ArgumentDefaultsHelpFormatter)
  arg_parser.add_argument("-c",
                          "--count",
                          type=int,
                          default=20,
                          dest="count",
                          help="Amount of recent reviews to fetch")
  arg_parser.add_argument("-m",
                          "--mode",
                          choices=tuple(m.name.lower() for m in PlayerMode),
                          default=PlayerMode.MANUAL.name.lower(),
                          dest="mode",
                          help="""Playing mode.
                                  "manual" let you select tracks to play one by one.
                                  "radio" let you select the first one, and then plays all tracks by chronological
                                  order.
                                  "discover" automatically plays all tracks by chronological order from the first non
                                  played one.""")
  arg_parser.add_argument("-i",
                          "--interactive",
                          action="store_true",
                          default=False,
                          dest="interactive",
                          help="Before playing each track, ask user confirmation, and allow opening review URL.")
  arg_parser.add_argument("-v",
                          "--verbosity",
                          choices=("warning", "normal", "debug"),
                          default="normal",
                          dest="verbosity",
                          help="Level of logging output")
  args = arg_parser.parse_args()
  args.mode = PlayerMode[args.mode.upper()]

  # setup logger
  logger = logging.getLogger()
  logging_level = {"warning": logging.WARNING,
                   "normal": logging.INFO,
                   "debug": logging.DEBUG}
  logging.getLogger().setLevel(logging_level[args.verbosity])
  logging.getLogger("requests").setLevel(logging.ERROR)
  logging.getLogger("urllib3").setLevel(logging.ERROR)
  logging.getLogger("PIL").setLevel(logging.ERROR)
  logging_formatter = colored_logging.ColoredFormatter(fmt="%(message)s")
  logging_handler = logging.StreamHandler()
  logging_handler.setFormatter(logging_formatter)
  logger.addHandler(logging_handler)

  # locale (for date display)
  locale.setlocale(locale.LC_ALL, "")

  # get reviews
  known_reviews = KnownReviews()
  reviews = list(itertools.islice(get_reviews(), args.count))

  # http cache
  cache_dir = appdirs.user_cache_dir("amg-player")
  os.makedirs(cache_dir, exist_ok=True)
  cache_filepath = os.path.join(cache_dir, "http_cache.db")
  http_cache = web_cache.WebCache(cache_filepath,
                                  "reviews",
                                  caching_strategy=web_cache.CachingStrategy.FIFO,
                                  expiration=60 * 60 * 24 * 30 * 3,  # 3 months
                                  compression=web_cache.Compression.DEFLATE)
  purged_count = http_cache.purge()
  row_count = len(http_cache)
  logging.getLogger().debug("HTTP Cache contains %u entries (%u removed)" % (row_count, purged_count))

  # initial menu
  if args.mode in (PlayerMode.MANUAL, PlayerMode.RADIO):
    menu_ret = AmgMenu.setupAndShow(args.mode, reviews, known_reviews, http_cache)

  to_play = None
  track_loop = True
  while track_loop:
    if (args.mode in (PlayerMode.MANUAL, PlayerMode.RADIO)):
      if menu_ret is None:
        break
      else:
        selected_idx, action = menu_ret

    if args.mode is PlayerMode.MANUAL:
      # fully interactive mode
      review = reviews[selected_idx]
    elif args.mode is PlayerMode.RADIO:
      # select first track interactively, then auto play
      if to_play is None:
        review = reviews[selected_idx]
        to_play = reviews[0:reviews.index(review) + 1]
        to_play.reverse()
        to_play = iter(to_play)
    elif args.mode is PlayerMode.DISCOVER:
      # auto play all non played tracks
      if to_play is None:
        to_play = filter(lambda x: not known_reviews.isKnownUrl(x.url),
                         reversed(reviews))
    if args.mode in (PlayerMode.RADIO, PlayerMode.DISCOVER):
      try:
        review = next(to_play)
      except StopIteration:
        break

    # fetch review & play
    review_page = fetch_page(review.url, http_cache=http_cache)
    track_urls, audio_only = get_embedded_track(review_page, http_cache)
    if track_urls is None:
      logging.getLogger().warning("Unable to extract embedded track")
    else:
      print("-" * (shutil.get_terminal_size()[0] - 1))
      print("Artist: %s\n"
            "Album: %s\n"
            "Review URL: %s\n"
            "Published: %s\n"
            "Tags: %s" % (review.artist,
                          review.album,
                          review.url,
                          review.date_published.strftime("%x %H:%M"),
                          ", ".join(review.tags)))
      if args.interactive:
        input_loop = True
        while input_loop:
          c = None
          while c not in frozenset("pdrsq"):
            c = input("Play (p) / Download (d) / Go to review (r) / Skip to next track (s) / Exit (q) ? ").lower()
          if c == "p":
            known_reviews.setLastPlayed(review.url)
            play(review, track_urls, merge_with_picture=audio_only)
            input_loop = False
          elif c == "d":
            download_audio(review, track_urls)
            input_loop = False
          elif c == "r":
            webbrowser.open_new_tab(review.url)
          elif c == "s":
            input_loop = False
          elif c == "q":
            input_loop = False
            track_loop = False
      else:
        known_reviews.setLastPlayed(review.url)
        if ((args.mode in (PlayerMode.MANUAL, PlayerMode.RADIO)) and
                (action is AmgMenu.UserAction.DOWNLOAD_AUDIO)):
          download_audio(review, track_urls)
        else:
          play(review, track_urls, merge_with_picture=audio_only)

    if track_loop and (args.mode is PlayerMode.MANUAL):
      # update menu and display it
      menu_ret = AmgMenu.setupAndShow(args.mode, reviews, known_reviews, http_cache, selected_idx=selected_idx)


if __name__ == "__main__":
  cl_main()
