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

# 自动搜索.env文件
load_dotenv(verbose=True)
# 等价与上面写法
load_dotenv(find_dotenv(), verbose=True)
# 指定env文件
load_dotenv(find_dotenv(Path.cwd().joinpath('.env')))

# git commit的信息
message = "img"
# 刚刚获取到的私人令牌
access_token = os.getenv('access_token_gitee')
# gitee的用户名
owner = os.getenv('owner')
# 刚刚新建的仓库名
repo = os.getenv('repo')
# api url
base_url = "https://gitee.com/api/v5/repos/"


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
    print(basename)
    return os.path.join(base_url, owner, repo, "contents", time.strftime("%Y-%m-%d", time.localtime()),
                        time.strftime("%H", time.localtime()), basename)


def upload_img(filename, access_token, message):
    tmp = """{"access_token":"%s","content":"%s","message":"%s"}"""
    url = generate_url()
    with open(filename, 'rb') as f:
        encode_img = base64.b64encode(f.read())
        img_base64 = encode_img.decode()
        headers = {"Content-Type": "application/json;charset=UTF-8"}
        # print(img_base64)
        data = tmp % (access_token, img_base64, message)
        f.close()
        try:
            res = requests.post(url=url, headers=headers, data=data.encode('utf-8'))
            res.encoding = "utf-8"
            resBody = json.loads(res.text)
            return resBody['content']["download_url"]
        except Exception as e:
            print(e)
            return False


imgArrs = []
imgs = sys.argv[1:]
for filename in imgs:
    if get_size(filename) > 1000:
        filename = compress_img(filename)
        download_url = upload_img(filename,access_token, message)
        os.remove(filename)
    else:
        download_url = upload_img(filename, access_token, message)
    imgArrs.append(download_url)


print("Upload Success:")
for url in imgArrs:
    print(url)
