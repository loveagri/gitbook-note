# youtube downloader

---





```javascript
// ==UserScript==
// @name         Distill Video & Audio Downloader from 5000+ sites including Youtube, Support 1080P, 2K, 4k & 8K
// @namespace   https://distillvideo.com/
// @version     2.1.1
// @date        2018-06-17
// @description Browser extension to download video and audio from Youtube, Twitter, Vimeo, Facebook, Dailymotion, 1tv, VK, youku, bilibili and 5000 more sites for free. Fast and easy to use.
// @author      DistillVideo.com
// @copyright   2018, DistillVideo.com
// @homepage    https://distillvideo.com/page/extensions
// @downloadURL https://distillvideo.com/js/ditillvideo.user.js
// @compatible chrome
// @compatible firefox
// @compatible opera
// @compatible safari
// @license GNU GPL v3.0 or later. http://www.gnu.org/copyleft/gpl.html
// @match          *://*.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    if (document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer) {
    setInterval(function() {
        if (window.location.href.indexOf("watch?v=") < 0) {
            return false;
        }
        if (document.getElementById("count") && document.getElementById("distillvideo") === null) {
            Addytpolymer();
        }
    }, 100);
} else {
    setInterval(function() {
        if (window.location.href.indexOf("watch?v=") < 0) {
            return false;
        }
        if (document.getElementById("watch7-subscription-container") && document.getElementById("distillvideo") === null) {
            AddhtmlDV();
        }
    }, 100);
}

function AddhtmlDV() {
    if (document.getElementById("watch7-subscription-container")) {
        var wrap = document.getElementById('watch7-subscription-container');
        var button = "<div id='distillvideo' style='display: inline-block; margin-left: 10px; vertical-align: middle;'>";
        button += "<a href=\"https://distillvideo.com/?url=https://www.youtube.com/watch?v=" + disvidyouvid(document.URL) + "\" title=\"Download this video\" target=\"_blank\"" +
            "style=\"display: inline-block; font-size: inherit; height: 22px; border: 1px solid rgb(0, 183, 90); border-radius: 3px; padding-left: 28px; cursor: pointer; vertical-align: middle; position: relative; line-height: 22px; text-decoration: none; z-index: 1; color: rgb(255, 255, 255);\">";
        button += "<i style=\"position: absolute; display: inline-block; left: 6px; top: 3px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIGlkPSJzdmcyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNIDQsMCA0LDggMCw4IDgsMTYgMTYsOCAxMiw4IDEyLDAgNCwwIHoiIGZpbGw9IiNmZmZmZmYiIC8+PC9zdmc+); background-size: 12px; background-repeat: no-repeat; background-position: center center; width: 16px; height: 16px;\"></i>";
        button += "<span style=\"padding-right: 12px;\">Download</span></a></div>";
        var style = "<style>#distillvideo button::-moz-focus-inner{padding:0;margin:0}#distillvideo a{background-color:#15388c}#distillvideo a:hover{background-color:#E91E63}#distillvideo a:active{background-color:rgb(0, 151, 74)}</style>";
        var tmp = wrap.innerHTML;
        wrap.innerHTML = tmp + button + style;
    }
}

function Addytpolymer() {
    var buttonDiv = document.createElement("span");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "distillvideo";
    var addButton = document.createElement("a");
    addButton.appendChild(document.createTextNode("Download video"));
    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#15388c";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "5px 10px";
    addButton.style.margin = "0px 10px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";
    addButton.style.textDecoration = "none";
    addButton.href = "https://distillvideo.com/?url=https://www.youtube.com/watch?v=" + disvidyouvid(window.location.href);
    addButton.target = "_blank";
    buttonDiv.appendChild(addButton);
    var targetElement = document.querySelectorAll("[id='count']");
    for (var i = 0; i < targetElement.length; i++) {
        if (targetElement[i].className.indexOf("ytd-video-primary-info-renderer") > -1) {
            targetElement[i].appendChild(buttonDiv);
        }
    }
}

function disvidyouvid(url) {
    var p = /((http|https)\:\/\/)?(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
    return (url.match(p)) ? RegExp.$3 : false;
}

})();
```





### improvement

```python
from pytube import Playlist
# pip install pytube3
from pytube import YouTube
import datetime

SAVE_PATH = "./video"


def progress_func(self, stream, chunk, file_handle, bytes_remaining):
    size = self.video.filesize
    progress = (float(abs(bytes_remaining - size) / size)) * float(100)
    self.loadbar.setValue(progress)


x = 1

# link = input("Paste your playlist link here: \n")
link = 'https://www.youtube.com/playlist?list=PLRIk0XLm74PiDSmBiTaArst8BlcI2LO6G'

playlist = Playlist(link)
length = len(playlist.video_urls)
print(length, 'videos will be downloaded.\n')
if len(playlist.video_urls) == 100:
    print("Due to limitations of youtube playlists you can only download the first 100 videos from the playlist. If you want to download more, you'll need to split your playlist into multiple seperate ones with 100 videos each.")

print("Downloading files started")
time = datetime.datetime.now()
dirname = time.strftime("%c").replace(":", " ")

for video_url in playlist.video_urls:
    video = YouTube(video_url)
    title = video.player_response['videoDetails']['title'].replace('Spring Cloud Alibaba从入门到进阶', '').strip()
    videoId = video.player_response['videoDetails']['videoId']

    try:
        print(title, videoId)
        path = video.streams.get_highest_resolution().download(f"{SAVE_PATH}/{dirname}/MP4", filename=(title if title != '' else videoId))
        print("file path:", path)
        print(f"Download {x} of {length} completed.", path)
    except Exception as e:
        print("File could not be downloaded, skipping...")
        print(e)

    print()
    x = x + 1

```

