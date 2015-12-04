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
            {test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel?optional[]=runtime&stage=0'},
            {test: /\.es?$/, loader: 'babel?optional[]=runtime&stage=0'},
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
        new Webpack.optimize.DedupePlugin(),
        new Webpack.optimize.OccurenceOrderPlugin(true),
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

