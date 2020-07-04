# youbube downloader



[author github](https://github.com/KW0jtowicz/PyPlaylister)

---

Pre install <code>pip install pytube</code>

### pre get the link

```js
window["ytInitialData"].contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents.forEach((item, i)=>{console.log("'https://www.youtube.com/"+item.playlistVideoRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url+"',")})
```



### python download code

```python
#!/usr/bin/env python3

import urllib.request

import urllib.error

import re
import time
import os
from pytube import YouTube


def getPageHtml(url):
    try:
        yTUBE = urllib.request.urlopen(url).read()
        return str(yTUBE)
    except urllib.error.URLError as e:
        print(e.reason)
        exit(1)


def getPlaylistUrlID(url):
    if 'list=' in url:
        eq_idx = url.index('=') + 1
        pl_id = url[eq_idx:]
        if '&' in url:
            amp = url.index('&')
            pl_id = url[eq_idx:amp]
        return pl_id
    else:
        print(url, "is not a youtube playlist.")
        exit(1)


def getFinalVideoUrl(vid_urls):
    final_urls = []
    for vid_url in vid_urls:
        url_amp = len(vid_url)
        if '&' in vid_url:
            url_amp = vid_url.index('&')
        final_urls.append('http://www.youtube.com/' + vid_url[:url_amp])
    return final_urls


def getPlaylistVideoUrls(page_content, url):
    playlist_id = getPlaylistUrlID(url)

    vid_url_pat = re.compile(r'watch\?v=\S+?list=' + playlist_id)
    vid_url_matches = list(set(re.findall(vid_url_pat, page_content)))

    if vid_url_matches:
        final_vid_urls = getFinalVideoUrl(vid_url_matches)
        print("Found", len(final_vid_urls), "videos in playlist.")
        printUrls(final_vid_urls)
        return final_vid_urls
    else:
        print('No videos found.')
        exit(1)


def printUrls(vid_urls):
    for url in vid_urls:
        print(url)
        time.sleep(0.04)


def download_Video_Audio(save_path, vid_url, x, length):
    video = YouTube(vid_url)
    title = video.player_response['videoDetails']['title'].replace('课时', '').strip()
    videoId = video.player_response['videoDetails']['videoId']

    try:
        print('start downloading:', title, videoId)
        path = video.streams.get_highest_resolution().download(save_path, filename=(title if title != '' else videoId))
        print("file path:", path)
        print(f"Download {x} of {length} completed.")
    except Exception as e:
        print("File could not be downloaded, skipping...")
        print(e)

    print()


if __name__ == '__main__':

    url = "https://www.youtube.com/playlist?list=PLh7DRwYmUgh7swOvZUZ52LMeGDmjFH0nv"
    directory = os.path.join('video/tensorflow', time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(time.time()))))

    # make directory if dir specified doesn't exist
    try:
        os.makedirs(directory, exist_ok=True)
    except OSError as e:
        print(e)
        exit(1)

    # option 1: if the video num is less 100, you can crawler it
    # if not url.startswith("http"):
    #     url = 'https://' + url
    #
    # playlist_page_content = getPageHtml(url)
    # vid_urls_in_playlist = getPlaylistVideoUrls(playlist_page_content, url)

    # option 2: here you can add more than 100 videos
    vid_urls_in_playlist = [
        'https://www.youtube.com//watch?v=3fB6OyPW5LU&list=PLh7DRwYmUgh7swOvZUZ52LMeGDmjFH0nv&index=2&t=0s',
        'https://www.youtube.com//watch?v=A-h1ZqJSSNU&list=PLh7DRwYmUgh7swOvZUZ52LMeGDmjFH0nv&index=3&t=0s',
        'https://www.youtube.com//watch?v=IsyEaa0mIVk&list=PLh7DRwYmUgh7swOvZUZ52LMeGDmjFH0nv&index=4&t=0s',
        ]

    print('total download file is ', len(vid_urls_in_playlist), '\n')

    # downloads videos and audios
    for i, vid_url in enumerate(vid_urls_in_playlist):
        download_Video_Audio(directory, vid_url, i + 1, len(vid_urls_in_playlist))
        time.sleep(1)

```



​	