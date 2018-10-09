const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const webpack = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackShellPlugin = require('webpack-shell-plugin')

const _clientAssets = 'resources/assets'
const _publicAssets = 'public/assets'

const isDevelopment = () => process.env.NODE_ENV === 'development'
const isProduction = () => process.env.NODE_ENV === 'production'

module.exports = {
	mode: 'development',
	entry: {
		app: './'+_clientAssets+'/vue/taskapp.js',
		vendor: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync', 'vuex-persistedstate'],
	},
	output: {
		path: path.resolve(__dirname, './'+_publicAssets),
		filename: isProduction() ? 'js/[name].[hash].js' : 'js/[name].js',
		chunkFilename: isProduction() ? 'js/[name].[hash].js' : 'js/[name].js',
		publicPath: path.resolve(__dirname, './'+_publicAssets)
	},
	resolve: {
		modules: [
			path.resolve(__dirname, _clientAssets),
			path.join(__dirname, 'node_modules'),
		],
		extensions: ['.js', '.sass', '.scss', '.vue'],
	},
	optimization: {
		splitChunks: {
			name: 'vendor'
		},
		minimizer: [
            new uglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                },
            }),
            new optimizeCSSAssetsPlugin({})
        ],
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader'],
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				include: [
					path.resolve(__dirname, _clientAssets),
				],
				exclude: /node_modules/,
			},
			 {
				test: /\.json$/,
				use: ['json-loader'],
			},
			{
				test: /\.pug$/,
				use: ['pug-loader'],
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					miniCssExtractPlugin.loader,
					{
						loader: 'css-loader?minimize',
						options: {
							url: false,
							sourceMap: true,
							publicPath: (path) => '../${path}',
						}
					},
					{
						loader: 'sass-loader?minimize',
						options: {
							sourceMap: true,
							publicPath: (path) => '../${path}',
						}
					}
				],
			},
			{
				test: /\.css$/,
				use: [
					miniCssExtractPlugin.loader,
					{
						loader: 'css-loader?minimize',
						options: {
							url: false,
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: isProduction() ? _clientAssets+'/images/[name].[hash].[ext]' : _clientAssets+'/images/[name].[ext]',
					publicPath: (path) => '../${path}',
				},
			},
			{
				test: /\.(eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: isProduction() ? _clientAssets+'/fonts/[name].[hash].[ext]' : _clientAssets+'/fonts/[name].[ext]',
					publicPath: (path) => '../${path}',
				},
			},
			{
				test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: isProduction() ? _clientAssets+'/fonts/[name].[hash].[ext]' : _clientAssets+'/fonts/[name].[ext]',
					publicPath: (path) => '../${path}',
				},
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(),
		new miniCssExtractPlugin({
			filename: isProduction() ? '/css/[name].[contenthash].css' : '/css/[name].css',
		}),
		new webpack.ProvidePlugin({
			Vue: ['vue', 'default'],
		}),
		new webpackShellPlugin({
			// onBuildStart:['echo "Webpack Start"'],
			onBuildEnd:['npm run express:dev']
		})
	],
	devServer: {
		contentBase: path.join(__dirname, _publicAssets),
		historyApiFallback: true,
		noInfo: true,
	},
}

if (isProduction()) {
	module.exports.devtool = '#source-map'
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
	])
}