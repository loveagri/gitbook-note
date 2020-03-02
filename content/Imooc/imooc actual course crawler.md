# 慕课网实战课程爬虫

```python
# -*- coding: utf-8 -*-
import time

import requests
import re
import json
from requests.exceptions import RequestException
from multiprocessing import Pool


def get_one_page(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.content.decode("utf-8")
        return None
    except RequestException as e:
        print(e, '异常')
        return None


def parse_title(page):
    url = 'https://coding.imooc.com/class/' + str(page) + '.html'
    html = get_one_page(url)
    pattern = re.compile('<div class="title-box">.*?<h1>(.*?)</h1>', re.S)

    items = re.findall(pattern, html)
    return items[0]


def parse_one_page(html):
    pattern = re.compile('<div class="shizhan-course-wrap l.*?">.*?<a href="/class/(\d+?)\.html">.*?<div class="box">.*?lecturer-info.*?<span>(.*?)</span>.*?shizhan-intro-box.*?title=".*?">'
                         '(.*?)</p>.*?class="grade">(.*?)</span>.*?imv2-set-sns.*?</i>'
                         '(.*?)</span>.*?class="big-text">(.*?)</p>.*?shizan-desc.*?>'
                         '(.*?)</p>.*?</div>', re.S)

    items = re.findall(pattern, html)

    for item in items:
        sb = parse_title(item[0])
        print(item[2], item[0], sb)
        time.sleep(5)
        yield {
            'link': item[0],
            'st': item[2],
            'bt': sb,
            'teacher': item[1],
            # 'grade': item[3],
            # 'people':item[4],
            # 'score': item[5],
            # 'describe': item[6]
        }


def write_to_file(content):
    with open('imoocAll5.js', 'a', encoding='utf-8') as f:
        f.write(json.dumps(content, ensure_ascii=False) + '\n')
        f.close()


def main(page):
    url = 'https://coding.imooc.com/?sort=2&page=' + str(page)
    html = get_one_page(url)
    with open(str(page) + '.html', 'a', encoding='utf-8') as f:
        f.write(json.dumps(html, ensure_ascii=False))
        f.close()
    # parse_one_page(html)
    # print(html)
    for i, item in enumerate(parse_one_page(html)):
        print(i, item)
        write_to_file(item)


if __name__ == '__main__':
    pool = Pool()
    pool.map(main, [1, 2, 3, 4, 5, 6])
    print('finish')

```



