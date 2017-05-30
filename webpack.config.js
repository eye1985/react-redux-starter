const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const filename = process.env.NODE_ENV === "development" ? '[name].js' : '[name].[chunkhash].js';

const VENDOR_LIBS = [
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "redux-thunk"
];

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor : VENDOR_LIBS
    },

    output: {
        filename,
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
                use: extractSass.extract({
                    use: [
                      {loader: "css-loader"},
                      {loader: "sass-loader"}
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },

    plugins : [
      extractSass,
      new webpack.optimize.CommonsChunkPlugin({
        names:['vendor','manifest']
      }),

      new HtmlWebpackPlugin({
        template:'src/index.html'
      })
    ],

    devServer : {
        port: 3000,
        hot:true,
        compress:true
    }
};
