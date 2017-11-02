var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var flexibility = require('postcss-flexibility');

module.exports = {
  // devtool: 'source-map',
  entry: {
    index: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/common/common.css',
      './src/components/home/index.js'
    ],
    test: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/common/common.css',
      './src/components/test/index.js'
    ],
    toolkit: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/common/common.css',
      './src/components/toolkit/index.js'
    ],
    tag: [
      'babel-polyfill',
      'whatwg-fetch',
      './src/common/common.css',
      './src/components/testTag/index.js'
    ]
  },
  debug: false,
  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '主页',
      template: 'src/template/index.ejs',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'React Gluttonous Snake',
      template: 'src/template/index.ejs',
      filename: 'test-snake.html',
      chunks: ['test']
    }),
    new HtmlWebpackPlugin({
      title: 'TOOLKIT',
      template: 'src/template/index.ejs',
      filename: 'toolkit.html',
      chunks: ['toolkit']
    }),
    new HtmlWebpackPlugin({
      title: 'GeneTag',
      template: 'src/template/index.ejs',
      filename: 'tag.html',
      chunks: ['tag']
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new CopyWebpackPlugin([
      { from: './assets/' }
    ]),
    new webpack.ProvidePlugin({
      CSSModules: 'react-css-modules'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('prod')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.css?$/,
        loaders: ['style?sourceMap',
                  'css?-minimize&modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                  'postcss'
        ]
      },
      {test: /\.(jpg|png|jpeg|woff)$/, loader: "url-loader?limit=8192"},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10240&mimetype=image/svg+xml'}
    ]
  },
  postcss: [autoprefixer({ browsers: ['> .01%', 'iOS >= 6'] }), flexibility]
};