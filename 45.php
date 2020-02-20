<?php
$secret = 'loveagri';

$path = '/home/wwwroot/default';

$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

file_put_contents('./1.txt',$signature);

if ($signature) {
    $hash = "sha1=" . hash_hmac('sha1', file_get_contents("php://input"), $secret);
    file_put_contents('./2.txt',$hash);
    file_put_contents('./3.txt',strcmp($signature, $hash));
    file_put_contents('./6.txt',shell_exec("cd {$path} && /usr/bin/git rest --hard origin/master && /usr/bin/git/ clean -f"));
    if (strcmp($signature, $hash) == 0) {
//        echo shell_exec("cd {$path} && /usr/bin/git rest --hard origin/master && /usr/bin/git/ clean -f && /usr/bin/git pull 2>&1");
        shell_exec("cd {$path} && /usr/bin/git pull");
        exit();
    }
}

http_response_code(404);
?>