# [xdebug](http://www.php.cn/jishu/php/410116.html)



php.ini

```ini
[xdebug]
zend_extension = /usr/local/lib/php/pecl/20170718/xdebug.so
#xdebug.remote_connect_back=1
#xdebug.remote_autostart=1
xdebug.collect_params=1
xdebug.collect_return=1
xdebug.remote_enable =1
xdebug.remote_port=9018
xdebug.idekey = PHPSTORM
xdebug.remote_host=localhost
xdebug.auto_trace=1
#xdebug.trace_output_dir="/tmp/php"
#xdebug.profiler_enable=1
#xdebug.profiler_output_dir="/tmp/php"
#xdebug.remote_handler=dbgp
```



ini配置后不能有注释

Unix系统安装按照官网检查配置下载https://xdebug.org/download.php

端口号在ini配置文件要和PHPstorm里统一，不需要和php服务端口号一样

如果配置不正常，可以在debug configuration->debug-preconfiguration->validate里检验错误