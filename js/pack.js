let fs = require('fs');
let path = require('path');


const ROOT = path.dirname(__dirname);
const SUMMARY = ROOT + '/content/SUMMARY.md';

// fs.writeFileSync(SUMMARY, "# Summary\n\n## [loveagri](README.md)\n---\n\n");
fs.writeFileSync(SUMMARY, "# Summary\n\n## [loveagri](README.md)\n\n\n");

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

let dumpFile = ($files, $contentPath, $tier) => {
    $filename = path.parse($files).name;
    $ext = path.extname($files);

    if ($ext !== '.md') {
        return;
    }

    // fs.appendFileSync(SUMMARY, '  '.repeat($tier) + "* [" + $filename + "](" + $contentPath + $files + ")\n");
    fs.appendFileSync(SUMMARY, "    * [" + $filename + "](" + $contentPath + $files + ")\n");
};


let rootDir = ($path, $contentPath = './', $tier = 0,index) => {

    let $dirs = dirAndFile($path, 0);
    let $files = dirAndFile($path, 1);


    if (!fs.existsSync($path + 'README.md')) {
        fs.createWriteStream($path + 'README.md');
    }


    let $filename = path.basename($path);

    // fs.appendFileSync(SUMMARY, '  '.repeat($tier) + "* [" + $filename + "](" + $contentPath + "README.md)\n");
    fs.appendFileSync(SUMMARY, '  '.repeat($tier) + "* [" + $filename + "](README.md)\n");

    let $dir;
    if ($dirs.length) {
        for (let y = 0; y < $dirs.length; y++) {
            $dir = $dirs[y];
            rootDir($path + $dir, $contentPath + $dir + '/', $tier + 2);
        }
    }

    if ($files.length) {
        let $file;
        for (let z = 0; z < $files.length; z++) {
            $file = $files[z];
            if (['README.md', 'SUMMARY.md', 'GLOSSARY.md', 'favicon.ico','book.json'].indexOf($file) >= 0) {
                continue;
            }
            dumpFile($file, $contentPath, $tier + 2);
        }
    }
};

$dirs = dirAndFile($path);
for (let i = 0; i < $dirs.length; i++) {

    $value = $dirs[i];

    if (['node_modules','styles'].indexOf($value) >= 0) {
        continue;
    }

    rootDir($path + $value + '/', './' + $value + '/', 0,i+1);

    // fs.appendFileSync(SUMMARY, "---\n\n");
    fs.appendFileSync(SUMMARY, "\n\n");
}



