'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'bootstrap-loader',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  module: {
    loaders: [
      // Convert SCSS into CSS with autoprefixer
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer?browsers=last 2 versions',
          'resolve-url',
          'sass?sourceMap&outputStyle=expanded'
        ]
      },
      // Font/svg loaders
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      // Transpile other JS/JSX files back to ES5
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|__tests__)/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    sassLoader: {
      includePaths: [
        path.resolve(__dirname, '../')
      ]
    }
  }
};
