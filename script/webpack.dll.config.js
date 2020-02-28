// webpack.dll.config.js
const webpack = require("webpack");
const { distResolve } = require('./unit.js');

module.exports = {
	// 你想要打包的模块的数组
	entry: {
		vendor: ['three']
	},
	output: {
		filename: '[name].dll.js',
		path: distResolve('dll'), // 打包后文件输出的位置
		library: '[name]_library'
		// 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]_library',
			path: distResolve('dll/manifest.dll.json'),
			context: __dirname
		})
	]
};