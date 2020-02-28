const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const { distResolve } = require('./unit.js');

const base = require('./webpack.base.js');

module.exports = merge({
  mode: 'production', // optimization.minimize 自动为true
  output: { // JS 路径
    path: distResolve(),
    filename: 'js/[id].[chunkhash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,  // 启用并行压缩
        cache: true,    // 启用缓存
      }),
      new OptimizeCssAssetsPlugin({ // 压缩css
        cssProcessorOptions: {
          safe: true
        }
      })
    ],
    runtimeChunk: true, // 自动拆分runtime文件
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'static', 'js', 'css', 'index.html', '*.js',
        '!manifest.dll.json', '!vendor.dll.js' // 不删除 dll 文件
      ],
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(distResolve('./dll/manifest.dll.json'))
    })
    // new CopyPlugin([
    //   { from: path.resolve(__dirname, '..', 'src/static'), to: path.resolve(__dirname, '..', 'dist/static') },
    // ]),
  ]
}, base);