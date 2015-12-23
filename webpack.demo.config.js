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
                    plugins: [
                        "syntax-class-properties",
                        'transform-class-properties',
                        'transform-es2015-template-literals',
                        'transform-es2015-literals',
                        'transform-es2015-function-name',
                        'transform-es2015-arrow-functions',
                        'transform-es2015-block-scoped-functions',
                        'transform-es2015-classes',
                        'transform-es2015-object-super',
                        'transform-es2015-shorthand-properties',
                        'transform-es2015-computed-properties',
                        'transform-es2015-for-of',
                        'transform-es2015-sticky-regex',
                        'transform-es2015-unicode-regex',
                        'check-es2015-constants',
                        'transform-es2015-spread',
                        'transform-es2015-parameters',
                        'transform-es2015-destructuring',
                        'transform-es2015-block-scoping',
                        'transform-es2015-typeof-symbol',
                        ['transform-regenerator', { async: false, asyncGenerators: false }],
                        'babel-plugin-transform-react-jsx',
                        'babel-plugin-transform-flow-strip-types',
                        'babel-plugin-syntax-flow',
                        'babel-plugin-syntax-jsx',
                        'babel-plugin-transform-react-display-name',
                    ]
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

