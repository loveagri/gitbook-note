<?php

include './php/class/File.php';

$File = new File();

$dirs = $File->getOneDirs('./content/');

var_dump($dirs);