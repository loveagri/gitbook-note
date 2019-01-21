<?php

$root = dirname(__FILE__);

$uroot = $root . '/asdf/';

if (isset($_GET['del']) && $_GET['del'] == 1) {
  unlinkDir($uroot);
}

if ($_FILES) {
   if ($_FILES["file"]["error"] > 0)  {
      echo "错误: " . $_FILES["file"]["error"] . "<br />";
      return;
  }
  // else {
  //     echo "文件名: " . $_FILES["file"]["name"] . "<br />";
  //     echo "类型: " . $_FILES["file"]["type"] . "<br />";
  //     echo "大小: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
  // }

  is_dir($uroot) || mkdir($uroot,0777);

  if (move_uploaded_file($_FILES["file"]["tmp_name"], $uroot . $_FILES["file"]["name"])) {
      // echo 'success';
      header($_SERVER['HTTP_HOST'] . $_SERVER['DOCUMENT_URI']);
  }

}


    function unlinkDir($aimDir)
    {
        $aimDir = str_replace('', '/', $aimDir);
        $aimDir = substr($aimDir, -1) == '/' ? $aimDir : $aimDir . '/';
        if (!is_dir($aimDir)) {
            return false;
        }
        $dirHandle = opendir($aimDir);
        while (false !== ($file = readdir($dirHandle))) {
            if ($file == '.' || $file == '..') {
                continue;
            }
            if (!is_dir($aimDir . $file)) {
                unlinkFile($aimDir . $file);
            } else {
                unlinkDir($aimDir . $file);
            }
        }
        closedir($dirHandle);
        return rmdir($aimDir);
    }

    function unlinkFile($aimUrl)
    {
        if (file_exists($aimUrl)) {
            unlink($aimUrl);
            return true;
        } else {
            return false;
        }
    }
?>
<html>
<body>
    <form method="post"  enctype="multipart/form-data">
        <input type="file" name="file" id="file" />
        <input type="submit"  value="go" />
    </form>
</body>
</html>



