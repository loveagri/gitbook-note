```
git config --global user.name "username"
git config --global user.email "email"

Create a new repository
git clone http://ip/loveagri/package.git
cd auto_package
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Existing folder
cd existing_folder
git init
git remote add origin http://ip/loveagri/package.git
git add .
git commit -m "Initial commit"
git push -u origin master

Existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin http://ip/loveagri/package.git
git push -u origin --all
git push -u origin --tags
```
