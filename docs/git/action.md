# Git Action

| 网站                                                         | 备注                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| [Docs](https://docs.github.com/en/actions)，[中文Docs](https://docs.github.com/zh/actions) | [quickstart](https://docs.github.com/en/actions/quickstart) |
| [workflow marketplace](https://github.com/marketplace)       |                                                             |

## Hello World Example

entrypoint.sh

```sh
#!/bin/sh -l

sh -c "echo hello world my name is $INPUT_MY_NAME"
```

Dockerfile

```dockerfile
FROM debian:9.5-slim

ADD entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["echo", "Hello, GitHub Actions!"]
```

action.yml

```yaml
name: 'Hello Actions'
description: 'Greet someone'
author: 'octocat@github.com'

inputs:
    MY_NAME:
        description: 'Who to greet'
        required: true
        default: 'World'

runs:
    using: 'docker'
    image: 'Dockerfile'

branding:
    icon: 'mic'
    color: 'purple'
```

main.yml

```yaml
name: A workflow for my Hello World file
on: push

jobs:
    build:
        name: hello world anction
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: ./action-a
              with:
                  MY_NAME: 'Mona'
```

示例结构

```sh
.
└── .github
    ├── workflows
    		└── *.yml
├── README.md
└── action-a
    ├── Dockerfile
    ├── action.yml
    └── entrypoint.sh
```

## run多条命令汇集

```yaml
name: 'deploy to github'
on: [push]
jobs:
    build-and-deploy:
        runs-on: ubuntu-latest
        steps:
            - name: checkout
              uses: actions/checkout@v2

            - name: Set up Node.js
              uses: actions/setup-node@v1
              with:
                  node-version: '20'
                  cache: 'npm'

            - name: Install dependencies
              run: npm install --silent

            - name: Build
              run: npm run docs:build

            - name: config git
              run: git config --global user.email "282656050@qq.com" && git config --global user.name "loveagri"

            - name: 分层 | 
              run: |
                  cd dist
                  echo 'www.dotohi.com' > CNAME
                  git init && git add -A
                  git commit -m 'deploy'
                  git branch -M master
                  git push -f https://${{ secrets.GH_TOKEN }}@github.com/loveagri/blog.git master
            - name: && 相连
              run: cd dist && echo 'www.dotohi.com' > CNAME && git init && git add -A && git commit -m 'deploy' && git branch -M master && git push -f https://${{ secrets.GH_TOKEN }}@github.com/loveagri/blog.git master
              
            - name: ;形式
              run: cd dist ; echo 'www.dotohi.com' > CNAME ; git init ; git add -A ; git commit -m 'deploy' ; git branch -M master ; git push -f https://${{ secrets.GH_TOKEN }}@github.com/loveagri/blog.git master
              
            - name: remove dist
              run: rm -rf dist

```



