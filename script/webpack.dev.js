const merge = require('webpack-merge');
const webpack = require('webpack');

const base = require('./webpack.base.js');
const { rootResolve } = require('./unit.js');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
  ],
  devServer: {
    contentBase: rootResolve("src"), // 寻找文件路径
    compress: true,
    port: 3333
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});