#!/usr/bin/env sh

message=${1:-"commit"}

# 确保脚本抛出遇到的错误1
set -e

git add -A
git commit -m  "build: $message"

# 推送到gitee
echo "------push to gitee start"
git push -u git@gitee.com:loveagri/note.git master
echo "------push to gitee end"

echo "-------------------------------------------------------------------"
# 推送到github
echo "------push to github start"
git push -u git@github.com:loveagri/note.git master
echo "------push to github end"


# 生成静态文件
# pnpm run docs:build

# 如果是发布到自定义域名
# cd dist
# echo "------go to dist"
# echo `pwd`

# echo 'www.dotohi.com' > CNAME
# echo "------add domain"

# git init
# echo "------init"
# git add -A
# echo "------add"
# git commit -m 'deploy'
# echo "------commit"

# git branch -M master

# git push -f git@github.com:loveagri/blog.git master
# echo "------push"

# cd -
# echo "------back to root"
# echo `pwd`

# # rm -rf dist
# echo "------remove dist"
# echo `pwd`
