# webpack

| 网站                                                         | 备注 |
| ------------------------------------------------------------ | ---- |
| [中文](https://webpack.docschina.org/)，[英文](https://webpack.js.org/) |      |

## Install

```sh
npm install -D webpack webpack-cli
```





## souremap

- 引入方式：inline、hidden、eval
- 源码展示：nosources
- 调试展示：cheap、cheap-module

线上production模式：soure-map, nosources-source-map, hidden-nosources-source-map, hidden-source-map



## config

```js
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const configs = {
	context: path.resolve(__dirname, "src"),
	// entry: './index.js',
	entry: {
		index: {
			import: './index.js',
			dependOn: ['react-dom'],
		},
		'react-dom': 'react',
		test: {
			import: './test.js',
			filename: './app.js',
		}
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "https://www.dotohi.com/public/",
		chunkFilename: "asser-[id].js"
	},
	loader: {
		rules: [
			{
				test: /\.css$/,
				loader: ['style-loader', 'css-loader'],
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
		}),

	],
	optimization: {
		minimizer: [
			new miniCssExtractPlugin({})
		]
	},
	devServer: {
		client: {
			overlay: false,
			compress: true,
			hot: 'only',
			open: true,
			proxy: {
				'/api/*': {
					target: 'http://localhost:3000',
					pathRewrite: {
						'^/api': ''
					},
					bypass: (req, res, proxyOptions) => {
						if (req.url.indexOf(proxyOptions.target) === -1) {
							return '/'
						}
					}
				}
			},
			// server: 'https'
		}
	},
	devtool: "source-map", //source-map, nosources-source-map, hidden-nosources-source-map, hidden-source-map
}

module.exports = (env, args) => {
	return configs
}

```

