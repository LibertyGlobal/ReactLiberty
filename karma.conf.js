'use strict';

var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({

    browsers: [
      'PhantomJS'
    ],

    frameworks: ['jasmine'],

    files: [
      'test/helpers/bind-polyfill.js',
      'test/helpers/object-assign-polyfill.js',
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },

    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine')
    ],

    webpack: webpackConfig,
    webpackServer: {
      noInfo: false
    },

    logLevel: config.LOG_INFO,
    reporters: 'dots',

    // Avoid DISCONNECTED messages
    // See https://github.com/karma-runner/karma/issues/598
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 60000 //default 10000
  });
};