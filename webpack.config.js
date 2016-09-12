var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(__dirname, '/public/uncompiled_index.html'),
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    entry: [
        './public/js/index.js',
    ],
    output: {
        path: path.join(__dirname, '/public/js/dist'),
        filename: 'index_bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
        ],
    },

    plugins: [
        HtmlWebpackPluginConfig,
    ],
};
