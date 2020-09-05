const HtmlWebPackPlugin = require('html-webpack-plugin');
const miniCSSExtractPlugin =  require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// MARK: - Plugins
const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

const pluginMiniCSSExtra = new miniCSSExtractPlugin({
    filename: '[name].[contentHash].css',
    ignoreOrder: false
});

const pluginCopyWebpack = new CopyWebpackPlugin(
    {
        patterns: [{from: 'src/assets', to: 'assets'}]
    }
);

const pluginOptimizeCSSAssetsWebpack = new OptimizeCSSAssetsWebpackPlugin();

const pluginBabelMinifyWebpack = new BabelMinifyWebpackPlugin();

const pluginCleanWebpack = new CleanWebpackPlugin()

module.exports = {
    mode: 'production',
    optimization: {
        minimizer: [pluginOptimizeCSSAssetsWebpack]
    },
    output: {
        filename: 'main.[contentHash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style\.css$/,
                use: [
                    miniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            }, 
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlWebPackPlugin,
        pluginMiniCSSExtra,
        pluginCopyWebpack,
        pluginBabelMinifyWebpack,
        pluginCleanWebpack
    ]
}