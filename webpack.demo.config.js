var BUNDLE_NAME = "test-component";

module.exports = {
    entry: "./demo/components/" + BUNDLE_NAME + ".jsx",
    devtool: "inline-source-map",
    output: {
        path: __dirname,
        filename: "./demo/components/" + BUNDLE_NAME + ".js"
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