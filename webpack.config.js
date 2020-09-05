const HtmlWebPackPlugin = require('html-webpack-plugin');
const miniCSSExtractPlugin =  require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// MARK: - Plugins
const htmlWebPackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

const pluginMiniCSSExtra = new miniCSSExtractPlugin({
    filename: '[name].css',
    ignoreOrder: false
});

const pluginCopyWebpack = new CopyWebpackPlugin(
    {
        patterns: [{from: 'src/assets', to: 'assets'}]
    }
);

const pluginOptimizeCSSAssetsWebpack = new OptimizeCSSAssetsWebpackPlugin();

const pluginCleanWebpack = new CleanWebpackPlugin()

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [pluginOptimizeCSSAssetsWebpack]
    },
    module: {
        rules: [
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
        pluginCleanWebpack
    ]
}