# laravel怎么打印执行的SQL语句

### 1. 通过事件监听器

Laravel提供了监听SQL执行事件的方式，开发者可以通过监听SQL执行事件来输出SQL语句，这种方式更加安全可靠，不会在生产环境中产生大量的日志。

通过定义监听器，在执行任意查询语句时都可以打印出相应的SQL语句。下面是实现代码：

```php
// 在AppServiceProvider的boot方法中，添加以下代码

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Events\QueryExecuted;

use Log;

// 注册SQL执行监听器

DB::listen(function (QueryExecuted $queryExecuted) {

    $sql = str_replace("?", "'%s'", $queryExecuted->sql);

    $bindings = $queryExecuted->connection->prepareBindings($queryExecuted->bindings);

    $fullSql = vsprintf($sql, $bindings);

    Log::debug('SQL:'.$fullSql);

});
```

在上述代码中，我们用DB::listen()注册一个事件监听器，当任何查询语句执行时都会被触发。

在监听器中通过 QueryExecuted 事件获取到当前查询的 SQL 语句以及相关绑定参数等信息，然后通过 Log::debug() 方法输出到日志中。



### 2. 通过日志输出

```php
// 在config/database.php文件中，找到default下的connections数组，增加以下选项：

'log_queries' => true,  // 开启SQL日志记录

'log_channel' => 'daily', // 日志存储方式，也可使用syslog、errorlog等方式

'log_level' => 'debug', // 日志级别
```

增加log_queries选项后，Laravel会自动记录执行的SQL语句，日志会输出到storage/logs目录下。

在代码中执行查询语句后，我们可以通过下面的方式来输出SQL语句：

```php
DB::enableQueryLog();

// 执行查询语句
$users = DB::table('users')->get();

// 获取执行的SQL语句
$sql = DB::getQueryLog()[0]['query'];
```

在上面代码中，首先调用DB::enableQueryLog()方法开启记录SQL语句，在执行查询后，可以通过DB::getQueryLog()方法获取所有已执行的SQL语句，如果要获取最后一条SQL语句，也可使用DB::getLastQuery()方法。
