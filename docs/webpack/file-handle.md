# [webpack将资源打成zip包](https://blog.csdn.net/XinZhongYi/article/details/80592599)



该插件允许你复制，打包，移动，删除文件及文件夹在build之前及之后。

安装：

​    npm install filemanager-webpack-plugin --save-dev

资源打zip包 Webpack.config.js：



```js
const FileManagerPlugin = require('filemanager-webpack-plugin');
    
new FileManagerPlugin({
  onEnd: {
    mkdir: ['./zip'],
    archive: [
      { source: './dist', destination: './zip/test.zip' },
    ]
  }
})

```

其他功能（移动，打包，复制）Webpack.config.js:



```js
const FileManagerPlugin = require('filemanager-webpack-plugin');
 
module.exports = {
  ...
  ...
  plugins: [
    new FileManagerPlugin({
      onEnd: {
        copy: [
          { source: '/path/from', destination: '/path/to' },
          { source: '/path/**/*.js', destination: '/path' },
          { source: '/path/fromfile.txt', destination: '/path/tofile.txt' },
          { source: '/path/**/*.{html,js}', destination: '/path/to' },
          { source: '/path/{file1,file2}.js', destination: '/path/to' },
          { source: '/path/file-[hash].js', destination: '/path/to' }
        ],
        move: [
          { source: '/path/from', destination: '/path/to' },
          { source: '/path/fromfile.txt', destination: '/path/tofile.txt' }
        ],
        delete: [
         '/path/to/file.txt',
         '/path/to/directory/'
        ],
        mkdir: [
         '/path/to/directory/',
         '/another/directory/'
        ],
        archive: [
          { source: '/path/from', destination: '/path/to.zip' },
          { source: '/path/**/*.js', destination: '/path/to.zip' },
          { source: '/path/fromfile.txt', destination: '/path/to.zip' },
          { source: '/path/fromfile.txt', destination: '/path/to.zip', format: 'tar' },
          { 
             source: '/path/fromfile.txt', 
             destination: '/path/to.tar.gz', 
             format: 'tar',
             options: {
               gzip: true,
               gzipOptions: {
                level: 1
               }
             }
           }
 
        ]
      }
    })
  ],
  ...
}

```





