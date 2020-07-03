// webpack.common.js
const path = require('path') // 路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入HtmlWebpackPlugin插件
const VueLoaderPlugin = require('vue-loader/lib/plugin') // vue-loader插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离css
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
	mode: 'development',
	entry: path.join(__dirname, '/src/main.js'), // 入口文件
	output: {
		path: path.join(__dirname, '/dist'), // 打包后的文件存放的地方
		filename: 'bundle.js' // 打包后输出文件的文件名
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
			{
				test: /\.(js|jsx)$/,
				use: { // 注意use选择如果有多项配置，可写成这种对象形式
					loader: 'babel-loader'
				},
				exclude: /node_modules/ // 排除匹配node_modules模块
			},
			{
				test: /\.(png|jpg|svg|gif)$/, // 正则匹配图片格式
				use: [
					{
						loader: 'url-loader', // 使用url-loader
						options: {
							limit: 1000, // 限制只有小于1kb的图片才转为base64，例子图片为384kb,所以不会被转化
							outputPath: 'images' // 设置打包后图片存放的文件夹名称
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/index.html'), // new一个这个插件的实例，并传入相关的参数
			title: '模版'
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		}),
		new VueLoaderPlugin()
	]
}