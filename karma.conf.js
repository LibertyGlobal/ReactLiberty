'use strict';

const reporters = [
  'mocha'
];
const browsers = [
  'Chrome'
];

let upstreamProxy = undefined;
let stb = undefined;

// Are we runnning tests on the STB
if (process.env['STB_TEST']) {
  // Load local config
  const execSync = require('child_process').execSync;
  const stbConfig = JSON.parse(execSync('stb config'));

  // proxy through the STB
  upstreamProxy = {
    path: 'MWRPAppServer',
    port: 8081,
    hostname: stbConfig.ip,
    protocol: 'http:'
  };

  // add the stb reporter to collect timestamped test logs
  reporters.push('stb');

  // add the stb launcher to run tests on the STB too
  browsers.push('stb');

  // configure the STB plugin
  stb = {
    reports: './reports',
    profile: 'latest'
  };
}

const webpackConfig = require('./webpack.karma.config.js');

module.exports = function (config) {
  config.set({
    upstreamProxy: upstreamProxy,
    browsers: browsers,
    reporters: reporters,
    stb: stb,

    frameworks: ['mocha'],

    files: [
      'test/helpers/bind-polyfill.js',
      'test/helpers/object-assign-polyfill.js',
      'test/spec/**/*.js'
    ],

    preprocessors: {
      'test/spec/**/*.js': ['webpack', 'sourcemap']
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
