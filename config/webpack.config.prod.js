/**
 * PRODUCTION WEBPACK CONFIGURATION
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const paths = require('./paths');

const publicPath = '';
const publicUrl = '';

//Setting webpack
module.exports = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: 'source-map',
    entry: {
        main: paths.appIndexJs,
        vendor: ['react', 'react-dom']
    },
    output: {
        path: paths.appBuild,
        filename: 'assets/js/[name].[chunkhash:8].js',
        chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader?-autoprefixer', 'postcss-loader', 'sass-loader']
                }),
                include: paths.appStyle
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/fonts/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/images/[name].[hash:8].[ext]'
                }
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: path.join(__dirname, '../.eslintrc'),
                    useEslintrc: false
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: paths.appSrc,
                postcss: [
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 2 versions'
                        ]
                    })
                ]
            }
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: publicUrl
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: paths.appHTML,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // React doesn't support IE8
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new ExtractTextPlugin('assets/style/[name].[contenthash:8].css'),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        })
        // new CleanWebpackPlugin([paths.appBuild], {
        //     root: process.cwd()
        // })
    ]
}