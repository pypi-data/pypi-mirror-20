#! python3

"""iibq

Ex:
	http://www.iibq.com/comic/82012136189/

"""

import re
import execjs

from functools import partial

from ..core import Episode, grabhtml

domain = ["www.iibq.com"]
name = "精明眼"

def get_title(html, url):
	title = re.search(r"<h1[^>]*>(.+?)</h1>", html, re.DOTALL).group(1)
	return title.strip()
	
def get_episodes(html, url):
	s = []
	html = html[html.index('<div class="cVol">'):]
	# base = re.search("(https?://[^/]+)", url).group(1)
	for match in re.finditer(
			r"href='(http://www\.iibq\.com/comic/\d+/viewcomic\d+/)'>([^<]+)",
			html):
		u, title = match.groups()
		s.append(Episode(title, u))
			
	return s[::-1]

def get_images(html, url):
	sFiles = re.search('sFiles="([^"]+)"', html).group(1)
	sPath = re.search('sPath="([^"]+)"', html).group(1)
	
	viewhtm = grabhtml("http://www.iibq.com/script/viewhtm.js")
	
	env = """
	window = {
		"eval": eval,
		"parseInt": parseInt,
		"String": String,
		"RegExp": RegExp
	};
	location = {
		"hostname": "www.iibq.com"
	};
	"""
	
	unsuan = partial(
		execjs.compile(
			env + re.search(r'(.+?)var cuImg', viewhtm, re.DOTALL).group(1)
		).call,
		"unsuan"
	)
	
	arrFiles = unsuan(sFiles).split("|")
	
	ds = grabhtml("http://www.iibq.com/script/ds.js")
	
	SLUrl = re.search('sDS = "([^"]+)"', ds).group(1).split("^")[0].split("|")[1]
	
	return [SLUrl + sPath + f for f in arrFiles]
