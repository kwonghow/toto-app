'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

var srcPath = path.resolve(__dirname, 'app');

module.exports = {
  entry: [
    'bootstrap-loader',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        minifyJS: true
      },
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
    }]
  },
  postcss: [
    require('autoprefixer')
  ],
  resolve: {
    // Resolve .js and .jsx files!
    extensions: ['', '.js', '.jsx'],
    root: srcPath
  }
};
