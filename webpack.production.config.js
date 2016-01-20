var BUNDLE_NAME = "app";
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
        test: /\.(jsx|es|js)$/,
        loader: 'babel-loader',
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
    extensions: ['', '.js', '.es', '.css', '.scss', '.png', '.jpg', '.ttf', '.json', '.json5']
  },
  plugins: [
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  node: {
    fs: 'empty'
  }
};

