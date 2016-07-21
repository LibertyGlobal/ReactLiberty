var BUNDLE_NAME = "react-liberty";
var path = require('path');

module.exports = {
    entry: "./src/index.js",
    devtool: "inline-source-map",
    output: {
        path: __dirname,
        filename: "/dist/" + BUNDLE_NAME + ".js"
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|es|js)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
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
    node: {
        fs: 'empty'
    },
    debug: true,
    devtool: 'source-map'
};