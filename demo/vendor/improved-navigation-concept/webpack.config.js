var path = require("path");

module.exports = {
  entry: {
    app: ['./demo/index.es']
  },
  output: {
    path: path.resolve(__dirname, 'demo'),
    publicPath: '/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.es$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es']
  },
  devtool: 'source-map'
};
