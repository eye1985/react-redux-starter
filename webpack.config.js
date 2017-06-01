const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === "development";
const filename = isDevelopment ? '[name].js' : '[name].[chunkhash].js';
const outputPath = path.resolve(__dirname, 'dist');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: isDevelopment
});

const VENDOR_LIBS = [
  "react",
  "react-dom",
  "redux",
  "react-redux",
  "redux-thunk"
];

const LOCAL = isDevelopment ? [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  './src/index.js'
] : [
  'babel-polyfill',
  './src/index.js'
];

const plugins = [
  extractSass,
  new webpack.optimize.CommonsChunkPlugin({
    names:['vendor','manifest']
  }),

  new HtmlWebpackPlugin({
    template:'src/index.html'
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(isDevelopment ? 'development':'production')
    }
  })
];

module.exports = {
    plugins,
    devtool: 'source-map',

    entry: {
        bundle: LOCAL,
        vendor : VENDOR_LIBS
    },

    output: {
        filename,
        path : outputPath
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
                use: isDevelopment ? ['style-loader', 'css-loader', 'sass-loader'] : extractSass.extract({
                    use: [
                      {loader: "css-loader"},
                      {loader: "sass-loader"}
                    ],
                    fallback: "style-loader"
                })
            }
        ]
    },

    devServer : {
        contentBase: outputPath,
        port: 3000,
        hot:true,
        compress:true
    }
};
