const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const { distResolve } = require('./unit.js');

const base = require('./webpack.base.js');

module.exports = merge({
  mode: 'production',
  optimization: {
    // minimizer: [new ParallelUglifyPlugin()],
    splitChunks: {
      chunks: 'all'
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!*.dll.*'], // 不删除 dll 文件
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(distResolve('./static/js/manifest.dll.json'))
    })
    // new CopyPlugin([
    //   { from: path.resolve(__dirname, '..', 'src/static'), to: path.resolve(__dirname, '..', 'dist/static') },
    // ]),
  ]
}, base);