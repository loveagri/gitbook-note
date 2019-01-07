<?php
define('ROOT', dirname(__DIR__));
define('SUMMARY',  ROOT . '/content/SUMMARY.md');


file_put_contents(SUMMARY,"# Summary\n\n * [Introduction](README.md)\n\n");

include ROOT . '/php/class/File.php';

$File = new File();

$path = ROOT . '/content/';

function dumpFile($files,$contentPath,$tier){
    $pathinfo = pathinfo($files);
    $filename = $pathinfo['filename'];
    $ext = $pathinfo['extension'];

    if ($ext) {
        return;
    }

    file_put_contents(SUMMARY,str_repeat(' ',$tier) . "* [{$filename}]({$contentPath}{$files})\n", FILE_APPEND);
}




function rootDir($path,$contentPath = './',$tier = 0){
    $File = new File();
    $dirs = $File->getOneDirs($path);
    $files = $File->getOneFiles($path);

    if (!is_file($path . 'README.md.md')) {
        touch($path . 'README.md');
    }


    $pathinfo = pathinfo($path);
    $filename = $pathinfo['filename'];

    file_put_contents(SUMMARY,str_repeat(' ',$tier) . "* [{$filename}]({$contentPath}README.md)\n",FILE_APPEND );

    if (!empty($dirs)) {
        foreach ($dirs as $dir) {
          rootDir($path . $dir, $contentPath . $dir . '/', $tier + 2);
        }
    }

    if (!empty($files)) {
        foreach ($files as $file) {
            if (in_array($file, ['README.md','SUMMARY.md'])) {
                continue;
            }
            dumpFile($file,$contentPath,$tier + 2);
        }
    }

}


$dirs = $File->getOneDirs($path);

foreach ($dirs as $value) {
    rootDir($path . $value . '/','./' . $value . '/',0);
    file_put_contents(SUMMARY,"\n",FILE_APPEND );
}






















// $dirArr = [];
// $path = ROOT . '/content/';
// function dir($dir){
//     foreach ($dirs as $k => $v) {
//     $path = $dir . $v . '/';

//     if (!is_file($path . 'index.md')) {
//         touch($path . 'index.md');
//     }

//     $innerFiles = $File->getOneFiles($path);
//     $dirArr[$v]['file'] = $innerFiles;

//     $innerDirs = $File->getOneDirs($path);
//     $dirArr[$v]['dir'] = $innerDirs;

//     if (!empty($dirArr[$v]['dir'])) {
//         foreach ($dirArr[$v]['dir'] as $key => $value) {
//             $dirArr[$v]['dir'][$value] = $File->getOneFiles($path . $value . '/');
//         }
//     }

// }
// }







