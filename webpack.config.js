const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app.min.js',
        publicPath : 'dist',
        path : path.resolve(__dirname, 'dist')
    },

    module : {
        rules : [
            {
                test: /\.js$/,
                exclude : /node_modules/,
                loader:'babel-loader'
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    },

    devServer : {
        port: 3000,
        hot:true,
        compress:true
    }
};
