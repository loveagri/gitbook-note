let fs = require('fs');
let path = require('path');


const ROOT = path.dirname(__dirname);
const SUMMARY = ROOT + '/content/SUMMARY.md';


let $path = ROOT + '/content/';

let dirAndFile = (filePath, type = 0) => {
    let files = fs.readdirSync(filePath);
    let dirArrs = [];
    let fileArrs = [];
    try {
        if (files && files.length) {
            let fsStats;
            for (let i = 0; i < files.length; i++) {
                fsStats = fs.statSync(filePath + files[i]);
                if (fsStats.isFile()) {
                    fileArrs.push(files[i])
                } else if (fsStats.isDirectory()) {
                    dirArrs.push(files[i])
                }
            }
        }
        return [dirArrs, fileArrs][type];
    } catch (err) {
        console.log(err)
    }
};

let rootDir = ($path, $contentPath = './', $tier = 0,index) => {

    let $dirs = dirAndFile($path, 0);
    let $files = dirAndFile($path, 1);


    if (!fs.existsSync($path + 'README.md')) {
        fs.createWriteStream($path + 'README.md');
    }

    let $filename = path.basename($path);

    let $dir;
    if ($dirs.length) {
        for (let y = 0; y < $dirs.length; y++) {
            $dir = $dirs[y];
            rootDir($path + $dir, $contentPath + $dir + '/', $tier + 2);
        }
    }

    if ($files.length) {
        let $filename,$ext;
        $files.forEach(function(item, index) {
           $filename = path.parse(item).name;
           $ext = path.extname(item);

           if ($ext !== '.md') {
            return;
        }
        fs.readFile($path+item,'utf8',function(err,files){
            var result = files.replace(/!\[(.*)\]\((.*)ud-img\/(.*)\)/g, '![$1](https://raw.githubusercontent.com/loveagri/note/master/ud-img/$3)');
            fs.writeFile($path+item, result, 'utf8', function (err) {
               if (err) return console.log(err);
           });
        })
    });
    }
};

$dirs = dirAndFile($path);
for (let i = 0; i < $dirs.length; i++) {

    $value = $dirs[i];

    if (['node_modules','styles'].indexOf($value) >= 0) {
        continue;
    }

    rootDir($path + $value + '/', './' + $value + '/', 0,i+1);

}





