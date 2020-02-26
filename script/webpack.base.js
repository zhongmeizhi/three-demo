const HtmlWebpackPlugin = require('html-webpack-plugin'); //通过 npm 安装
const webpack = require('webpack');
const HappyPack = require('happypack');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      '@static': resolve('static'),
    }
  },
  module: {
    rules: [
			// {
			// 	test: /\.css$/,
      //   exclude: /(node_modules|bower_components)/,
			// 	use: 'css-loader'
			// },
      // {
			// 	test: /\.ts$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: 'ts-loader'
			// },
			{
				test: /\.less$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'happypack/loader',
						options: {
							id: 'less',
							name: 'js/[hash:18].[ext]',
							// publicPath: '/'
						}
					}
				]
      },
      {
        test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,use: [
					{
						loader: 'happypack/loader',
						options: {
							id: 'babel',
							name: 'css/[hash:18].[ext]',
							// publicPath: '/'
						}
					}
				]
      }
    ]
  },
  plugins: [
		new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV), // 当前使用环境
      VERSION: JSON.stringify('0.1.0'),
    }),
		new HappyPack({
			id: 'less',
			loaders: [ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader' ]
		}),
		new HappyPack({
			id: 'babel',
			loaders: [ 'babel-loader?presets[]=@babel/preset-env' ]
		}),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
