var BUNDLE_NAME = "react-liberty";

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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel?optional[]=runtime&stage=0'
            }
        ]
    }
};