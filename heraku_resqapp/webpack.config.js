var webpack = require("webpack");
var path = require("path");
var router = require('react-router');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                options: {
                    presets: [  {
                              'plugins': ['@babel/plugin-proposal-class-properties']}]
                }

            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(ttf|jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
        ]
    }
};
module.exports = config;