```php+HTML

<?php
  if ($_FILES) {
          //获取到临时文件
    $file=$_FILES['file'];
      //获取文件名
    $fileName=$file['name'];
    echo $fileName;
      //移动文件到当前目录
    move_uploaded_file($file['tmp_name'],'./'.$fileName);

  }
?>


<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>go</title>
</head>
<body>
  <form action="p.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file"/>
    <input type="submit" value="提交">
  </form>
</body>
</html>

```

