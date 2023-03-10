const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: "source-map",
    cache: true,
    watch: false,
    target: "web",
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: '[name].build.js',
        path: path.resolve(__dirname, 'build'),
        libraryTarget: "umd",
    },
    experiments: {
        topLevelAwait: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: false,
        port: 9000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, contetn-type, Authorization",
        },
        allowedHosts: 'all'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: {
                        importLoaders: 1,
                        modules: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ]
            },
            {
              test: /\.(gif|png|jpe?g|svg|xml)$/i,
              use: "file-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".scss"],
        alias: {

        },
    }  
}