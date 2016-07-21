'use strict';

// Load local config
var execSync = require('child_process').execSync;
var stbConfig = JSON.parse(execSync('stb config'));

var webpackConfig = require('./webpack.karma.config.js');

module.exports = function (config) {
  config.set({

    // web proxy stuff
    upstreamProxy: {
      path: 'MWRPAppServer',
      port: 8081,
      hostname: stbConfig.ip,
      protocol: 'http:'
    },

    browsers: [
      'PhantomJS',
      'MyStb'
    ],

    // Need to use a custom launcher to pass parameters
    customLaunchers: {
      MyStb: {
        base: 'stb',
        stb: stbConfig.ip, // STB IP address
        server: stbConfig.localIp, // Karma server IP address as seen by STB
        // Additional TR-69 parameters to set (`UIServerURL` is constructed from config)
        tr69: {
        }
      }
    },

    frameworks: ['mocha'],

    files: [
      'test/helpers/bind-polyfill.js',
      'test/helpers/object-assign-polyfill.js',
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'stb'],


    // Options for the stb reporter
    stbReporter: {
      reportsDir: './reports'
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: false
    },

    logLevel: config.LOG_INFO,

    singleRun: false,

    // Avoid DISCONNECTED messages
    // See https://github.com/karma-runner/karma/issues/598
    browserDisconnectTimeout: 10000, // default 2000
    browserDisconnectTolerance: 1, // default 0
    browserNoActivityTimeout: 60000 //default 10000
  });
};
