const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

module.exports = {
    mode: 'development',
    entry: path.resolve('src', 'index.tsx'),
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve('dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre',
            },
            {
                test: /\.s?(css|ass)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: globImporter(),
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test GROWTH TECH',
            template: path.resolve('public', 'index.html'),
            filename: path.resolve('dist', 'index.html'),
        }),
    ],
}
