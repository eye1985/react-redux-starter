const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === "development";
const filename = isDevelopment ? '[name].js' : '[name].[chunkhash].js';
const outputPath = path.resolve(__dirname, 'dist');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[hash].css",
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

const mode = isDevelopment ? 'development' : 'production';

const plugins = [
    extractSass,

    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),

    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
        }
    })
];

module.exports = {
    plugins,
    mode,

    devtool: 'source-map',

    entry: {
        bundle: LOCAL,
        vendor: VENDOR_LIBS
    },

    output: {
        filename,
        path: outputPath
    },

    optimization: {
        splitChunks: { // CommonsChunkPlugin()
            name: 'vendor',
            minChunks: 2
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            {
                test: /\.css/,
                use: isDevelopment ? ['style-loader', 'css-loader'] : extractSass.extract({
                    use: [
                        {loader: "css-loader"}
                    ],
                    fallback: "style-loader"
                })
            },

            {
                test: /\.scss$/,
                use: isDevelopment ? ['style-loader', 'css-loader', 'sass-loader'] : extractSass.extract({
                    use: [
                        {loader: "css-loader"},
                        {loader: "sass-loader"}
                    ],
                    fallback: "style-loader"
                })
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },

            {
                test: /\.(svg|jpg|jpeg|png|bmp)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            }
        ]
    },

    devServer: {
        contentBase: outputPath,
        port: 3000,
        hot: true,
        compress: true
    }
};
