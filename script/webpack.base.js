const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rootResolve, distResolve } = require('./unit.js');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[hash:8].js',
		path: rootResolve('dist'),
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': rootResolve('src'),
			'@assets': rootResolve('src/assets'),
		}
	},
	// externals: [''],
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /(node_modules|bower_components)/,
				loaders: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
					}
				}, 'css-loader', 'postcss-loader', 'less-loader']
			},
			// {
			// 	test: /\.less$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: [
			// 		{
			// 			loader: MiniCssExtractPlugin.loader
			// 		},
			// 		{
			// 			loader: 'happypack/loader',
			// 			options: {
			// 				id: 'less',
			// 				name: 'js/[hash:8].[ext]',
			// 				// publicPath: '/'
			// 			}
			// 		}
			// 	]
			// },
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'happypack/loader',
				options: {
					id: 'babel',
				}
			},
			{
				test: /\.(png|jpe?g|gif|jpg)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'assets/img/[hash:8].[ext]'
					}
				}]
			},
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV), // 当前使用环境
			VERSION: JSON.stringify('0.1.0'),
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[hash:8].css", // css 路径
			// chunkFilename: "[id].css",
		}),
		// new HappyPack({
		// 	id: 'less',
		// 	// 'style-loader', 
		// 	loaders: ['css-loader', 'postcss-loader', 'less-loader']
		// }),
		new HappyPack({
			id: 'babel',
			loaders: [{
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					cacheDirectory: true
				}
			}]
		}),
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
};
