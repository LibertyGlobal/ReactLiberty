var BUNDLE_NAME = "app";
var path = require('path');
var Webpack = require('webpack');

module.exports = {
  entry: "./demo/" + BUNDLE_NAME + ".jsx",
  output: {
    path: './demo/build',
    publicPath: '.demo/build',
    filename: BUNDLE_NAME + '.js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|es)$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1']
        },
      },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-1']
        },
      },
      {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']},
      {test: /\.png$/, loaders: ['url-loader?limit=150000']},
      {test: /\.jpg$/, loaders: ['url-loader?limit=150000']},
      {test: /\.ttf$/, loader: 'url-loader?limit=150000'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.json5$/, loader: 'json5-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es', '.css', '.scss', '.png', '.jpg', '.ttf', '.json', '.json5'],
    alias: {
      'pixi': path.join(__dirname, 'node_modules/pixi.js')
    },
  },
  plugins: [
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  node: {
    fs: 'empty'
  },
  debug: true,
  devtool: 'source-map'
};

