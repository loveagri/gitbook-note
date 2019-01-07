<?php
define('ROOT', dirname(__DIR__));

include ROOT . '/php/class/File.php';

$File = new File();

$dirs = $File->getOneDirs(ROOT . '/content/');
$dirs = $File->getAllDir(ROOT . '/content/');
var_dump($dirs);

// foreach ($dirs as $k => $v) {
//     if (!is_file($path . 'index.md')) {
//         touch($path . 'index.md');
//     }

//     if (!is_file($path . 'RESDME.md')) {
//         touch($path . 'index.md');
//     }

// }





















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







