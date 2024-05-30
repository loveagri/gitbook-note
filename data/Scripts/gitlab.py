import requests
import sys
import time
import random
import os
import base64
import json
import cv2
from dotenv import load_dotenv, find_dotenv
from pathlib import Path
import urllib
from urllib import parse

# 自动搜索.env文件
load_dotenv(verbose=True)
# 等价与上面写法
load_dotenv(find_dotenv(), verbose=True)
# 指定env文件
load_dotenv(find_dotenv(Path.cwd().joinpath('./.env')))

# 刚刚获取到的私人令牌
access_token = os.getenv('access_token_gitlab')
# gitee的用户名
id = os.getenv('id')
# 刚刚新建的仓库名
branch = os.getenv('branch')
# 拼接路径
gitlab_raw = os.getenv('gitlab_raw')

# api url
base_url = "https://gitlab.com/api/v4/"


def compress_img(img):
    src = cv2.imread(img, 1)
    dirname, basename = os.path.split(img)
    purename = os.path.splitext(basename)[0]
    ext = os.path.splitext(basename)[1]
    compress_name = dirname + "/" + purename + "_compress" + ext
    cv2.imwrite(compress_name, src, [cv2.IMWRITE_JPEG_QUALITY, 80])
    return compress_name


def get_size(file):
    # 获取文件大小:KB
    size = os.path.getsize(file)
    return size / 1024


def generate_url():
    purename = os.path.splitext(os.path.split(filename)[-1])[0]
    basename = purename + "_" + time.strftime("%Y%m%d%H%M%S", time.localtime()) + os.path.splitext(filename)[-1]
    url = os.path.join(time.strftime("%Y-%m-%d", time.localtime()), time.strftime("%H", time.localtime()), basename).replace('/', '%2f')
    return os.path.join(base_url, "projects", id, "repository/files", url)


def upload_img(filename, access_token):
    url = generate_url()

    with open(filename, 'rb') as f:
        encode_img = base64.b64encode(f.read())
        headers = {"Content-Type": "application/json;charset=UTF-8", 'PRIVATE-TOKEN': access_token}
        f.close()
        try:
            res = requests.post(url, headers=headers, json={
                'branch': 'main',
                'content': encode_img.decode('utf-8'),
                'encoding': 'base64',
                'commit_message': 'image'
            })

            res.encoding = "utf-8"
            print(res.text, 333)
            resBody = json.loads(res.text)
            return resBody['file_path']
        except Exception as e:
            print(e)
            return False


imgArrs = []
imgs = sys.argv[1:]

for filename in imgs:
    if get_size(filename) > 1000:
        filename = compress_img(filename)
        download_url = upload_img(filename, access_token)
        os.remove(filename)
    else:
        download_url = upload_img(filename, access_token)
    imgArrs.append(download_url)

print("Upload Success:")
for url in imgArrs:
    print(os.path.join(gitlab_raw, branch, url))
