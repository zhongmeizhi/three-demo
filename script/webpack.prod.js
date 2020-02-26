const merge = require('webpack-merge');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const path = require('path');

const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    // minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    },
  },
  plugins: [
		// new CleanWebpackPlugin(),
    // new CopyPlugin([
    //   { from: path.resolve(__dirname, 'src/public'), to: 'dist/public' },
    // ]),
  ]
});