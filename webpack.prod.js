// webpack.prod.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件清理dist
const TerserPlugin = require('terser-webpack-plugin')   // 代码压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // CSS 代码压缩
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const dev = require('./config/prod')
const path = require('path')
module.exports = merge(common, { // 将webpackç.common.js合并到当前文件
	devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
	optimization: {
		minimizer: [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin()
		]
  },
	plugins: [
		new CleanWebpackPlugin(), // 清理所要清理的文件夾名称
		new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
			'process.env': dev
		})
	]
})