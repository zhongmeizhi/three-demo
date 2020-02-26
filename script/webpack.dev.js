const merge = require('webpack-merge');
// const webpack = require('webpack');
const path = require('path');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  plugins: [
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3333
  }
});