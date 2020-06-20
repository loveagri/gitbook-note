# youbube downloader



[author github](https://github.com/KW0jtowicz/PyPlaylister)

---

Pre install <code>pip install pytube</code>

```python
from pytube import Playlist
# pip install pytube3
from pytube import YouTube
import datetime
from pydub import AudioSegment
from os import listdir
from os.path import isfile, join
import os
import random

SAVE_PATH = "./video"

x = 1
a = 0
link = input("Paste your playlist link here: ")
# link = 'https://www.youtube.com/playlist?list=PLRIk0XLm74PiDSmBiTaArst8BlcI2LO6G'
playlist = Playlist(link)

print(len(playlist.video_urls), 'videos will be downloaded.\n')
if len(playlist.video_urls) == 100:
    print("Due to limitations of youtube playlists you can only download the first 100 videos from the playlist. If you want to download more, you'll need to split your playlist into multiple seperate ones with 100 videos each.")
print("Which format do you want your videos to be in? \n 1. MP4 \n 2. MP3")
# choice1 = input()
choice1 = "1"
print("Downloading files started, this might take a while depending on your internet connection. Don't close the window until it says that it's finished.")
time = datetime.datetime.now()
dirname = time.strftime("%c").replace(":", " ")
if choice1 == "1":
    for video_url in playlist.video_urls:
        video = YouTube(video_url)
        title = video.player_response['videoDetails']['title']
        videoId = video.player_response['videoDetails']['videoId']

        print(title)
        try:
            video.streams.get_highest_resolution().download(f"{SAVE_PATH}/{dirname}/MP4")
            print(f"Download {x} of {len(playlist.video_urls)} completed.")
        except:
            print("File could not be downloaded, skipping...")
        try:
            if title != "":
                os.rename(f"{SAVE_PATH}/{dirname}/MP4/Youtube.mp4", f"{SAVE_PATH}/{dirname}/MP4/{title}.mp4")
            else:
                os.rename(f"{SAVE_PATH}/{dirname}/MP4/Youtube.mp4", f"{SAVE_PATH}/{dirname}/MP4/{videoId}.mp4")
            print()
        except:
            print("")
        x = x + 1
elif choice1 == "2":
    for video_url in playlist.video_urls:
        print(f"Downloading: {YouTube(video_url).title}")
        try:
            YouTube(video_url).streams.get_audio_only().download(f"{SAVE_PATH}/{dirname}/MP3")
            print(f"Download {x} of {len(playlist.video_urls)} completed.")
        except:
            print("File could not be downloaded, skipping...")
        try:
            os.rename(f"{SAVE_PATH}/{dirname}/MP3/Youtube.mp4", f"{SAVE_PATH}/{dirname}/MP3/Youtube{random.randint(1000000, 9999999)}.mp4")
            print("")
        except:
            print("")
        x = x + 1
    onlyfiles = [f for f in listdir(f"{SAVE_PATH}/{dirname}/MP3") if isfile(join(f"{SAVE_PATH}/{dirname}/MP3", f))]
    filesnum = len(onlyfiles)
    for a in range(0, filesnum):
        print(f"Converting {onlyfiles[a]} to mp3...")
        try:
            gowno = onlyfiles[a].replace(" ", "")
            os.rename(f"{SAVE_PATH}/{dirname}/MP3/{onlyfiles[a]}", f"{SAVE_PATH}/{dirname}/MP3/{gowno}")
            mp4_audio = AudioSegment.from_file(f"{SAVE_PATH}/{dirname}/MP3/{gowno}", format="mp4")
            mp4_audio.export(f"{SAVE_PATH}/{dirname}/MP3/{gowno}.mp3", format="mp3")
            newfilename = onlyfiles[a].replace(".mp4", ".mp3")
            os.rename(f"{SAVE_PATH}/{dirname}/MP3/{gowno}.mp3", f"{SAVE_PATH}/{dirname}/MP3/{newfilename}")
            os.remove(f"{SAVE_PATH}/{dirname}/MP3/{gowno}")
        except:
            print("File could not be converted, skipping...")
    print(f"All done, you can find downloaded files in {SAVE_PATH}/{dirname}/MP3/")
else:
    exit()
	
```



​	