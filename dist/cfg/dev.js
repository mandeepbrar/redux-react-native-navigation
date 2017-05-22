'use strict';

var path = require('path');
var webpack = require('webpack');

var baseConfig = require('./base');
var defaultSettings = require('./defaults');

// Add needed plugins here
var BowerWebpackPlugin = require('bower-webpack-plugin');

var config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  output: {
    libraryTarget: "commonjs2",
    library: "redux-router-director",
    path: "build/",
    filename: "index.js"
  },
  externals: {
    "director": "director",
    "react": "react",
    "react-redux": "react-redux"
  },

  cache: false,
  devtool: 'sourcemap',
  plugins: [new webpack.NoErrorsPlugin()],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
});

module.exports = config;