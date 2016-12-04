/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const publicPath = '/';
const publicUrl = '';

// Get environment variables to inject into our app.
// var env = getClientEnvironment(publicUrl);

//Setting webpack
module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        paths.appIndexJs
    ],
    output: {
        path: paths.appBuild,
        pathinfo: true,
        filename: 'static/js/bundle.js',
        publicPath: publicPath
    },
    devServer: {
        contentBase: paths.appPublic,
        historyApiFallback: true,
        inline: true,
        port: 3000,
        hot: true,
        watchOptions: {
            ignored: /node_modules/
        },
        quiet: true
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
                },
                exclude: '/node_modules/'
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style!css?importLoaders=1!postcss'
            // },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader?sourceMap&-autoprefixer', 'postcss-loader', 'sass-loader?sourceMap'],
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
                },
                include: './src/app/fonts/'
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
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        // new CaseSensitivePathsPlugin()
    ]
}