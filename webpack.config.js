const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

const _clientAssets = 'resources/assets'
const _publicAssets = 'public/assets'

const isDevelopment = () => process.env.NODE_ENV === 'development'
const isProduction = () => process.env.NODE_ENV === 'production'

module.exports = {
	entry: {
		app: `./${_clientAssets}/vue/taskapp.js`,
		vendor: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync', 'vuex-persistedstate'],
	},
	output: {
		path: path.resolve(__dirname, `./${_publicAssets}`),
		filename: isProduction() ? 'js/[name].[hash].js' : 'js/[name].js',
		chunkFilename: isProduction() ? 'js/[name].[hash].js' : 'js/[name].js',
	},
	resolve: {
		modules: [
			path.resolve(__dirname, _clientAssets),
			path.join(__dirname, 'node_modules'),
		],
		extensions: ['.js', '.sass', '.scss', '.vue'],
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
				use: extractTextPlugin.extract('css-loader?minimize!sass-loader?minimize'),
			},
			{
				test: /\.css$/,
				use: extractTextPlugin.extract('css-loader?minimize'),
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: isProduction() ? `${_clientAssets}/images/[name].[hash].[ext]` : `${_clientAssets}/images/[name].[ext]`,
          publicPath: (path) => `../${path}`,
				},
			},
			{
        test: /\.(eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: isProduction() ? `${_clientAssets}/fonts/[name].[hash].[ext]` : `${_clientAssets}/fonts/[name].[ext]`,
          publicPath: (path) => `../${path}`,
        },
      },
      {
        test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: isProduction() ? `${_clientAssets}/fonts/[name].[hash].[ext]` : `${_clientAssets}/fonts/[name].[ext]`,
          publicPath: (path) => `../${path}`,
        },
      },
		],
	},
	plugins: [
    new extractTextPlugin({
      filename: isProduction() ? `${_clientAssets}/css/[name].[contenthash].css` : `${_clientAssets}/css/[name].css`,
    }),
    new webpack.ProvidePlugin({
      Vue: ['vue', 'default'],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, _publicAssets),
    historyApiFallback: true,
    noInfo: true,
  },
}