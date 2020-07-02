// webpack.prod.js
const { CleanWebpackPlugin }= require('clean-webpack-plugin') // 引入ClearWebpackPlugin插件清理dist
const merge = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const dev = require('./config/prod')
const path = require('path')
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
const devMode = process.env.NODE_ENV !== 'production';
module.exports = merge(common, { // 将webpackç.common.js合并到当前文件
	devtool: 'source-map', // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
	module: {
		rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
	},
	plugins: [
		new CleanWebpackPlugin(), // 清理所要清理的文件夾名称
		new PurifyCssWebpack({
			paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
		}),
		new webpack.DefinePlugin({ // DefinePlugin可以在编译时期创建全局变量。
			'process.env': dev
		}),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
		})
	]
})