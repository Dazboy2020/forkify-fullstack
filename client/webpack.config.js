const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	entry: './src/js/controller.js',
	output: {
		path: path.resolve(__dirname, '../public/'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, '../public/'),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:5000',
		},
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{ test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/, type: 'asset/resource' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	plugins: [
		new htmlWebpackPlugin({
			title: 'Webpack App',
			filename: 'index.html',
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};
