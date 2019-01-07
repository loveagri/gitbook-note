<?php
define('ROOT', dirname(__DIR__));

include ROOT . '/php/class/File.php';

$File = new File();

$dirs = $File->getOneDirs(ROOT . '/content/');
var_dump($File->getAllDir(ROOT . '/content/'));

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







