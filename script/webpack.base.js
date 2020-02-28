const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { rootResolve } = require('./unit.js');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[hash:8].js',
		path: rootResolve('dist')
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': rootResolve('src'),
			'@static': rootResolve('static'),
		}
	},
	// externals: [''],
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /(node_modules|bower_components)/,
				loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
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
			// 				name: resolve('dist/js/[hash:8].[ext]'),
			// 				// publicPath: '/'
			// 			}
			// 		}
			// 	]
			// },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'happypack/loader',
				options: {
					id: 'babel',
					name: rootResolve('dist/css/[hash:8].[ext]'),
					// publicPath: '/'
				}
			},
			{
				test: /\.(png|jpe?g|gif)(\?.*)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: rootResolve('dist/images/[hash:8].[ext]')
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
			filename: "[name].[hash:8].css",
			chunkFilename: "[id].css",
    }),
		// new HappyPack({
		// 	id: 'less',
		// 	// 'style-loader', 
		// 	loaders: ['css-loader', 'postcss-loader', 'less-loader']
		// }),
		new HappyPack({
			id: 'babel',
			loaders: ['babel-loader?presets[]=@babel/preset-env']
		}),
		new HtmlWebpackPlugin({ template: './src/index.html' })
	]
};
