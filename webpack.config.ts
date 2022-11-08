import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProd = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
	mode: isProd ? 'production' : 'development',
	devtool: !isProd ? 'cheap-module-source-map' : false,
	target: 'web',
	stats: 'errors-warnings',
	entry: {
		'vanilla-calendar': './src/index.ts',
	},
	output: {
		clean: true,
		path: path.resolve(__dirname, 'build'),
		filename: isProd ? '[name].min.js' : '[name].js',
		library: {
			type: 'umd2',
		},
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
			},
		},
		minimize: isProd,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				extractComments: false,
				terserOptions: {
					format: {
						comments: /!/i,
					},
				},
			}),
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	devServer: {
		static: './build',
		hot: true,
		compress: true,
		historyApiFallback: true,
		allowedHosts: 'all',
		client: {
			logging: 'warn',
			overlay: true,
			progress: false,
		},
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts$/i,
				loader: 'esbuild-loader',
				options: {
					loader: 'ts',
					target: 'es2015',
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: !isProd,
						},
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !isProd,
						},
					},
				],
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: 'name: @uvarov.frontend/vanilla-calendar | url: https://github.com/uvarov-frontend/vanilla-calendar',
		}),
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].min.css' : '[name].css',
			linkType: false,
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
			minify: false,
			cache: true,
			alwaysWriteToDisk: true,
			inject: false,
		}),
		new HtmlWebpackHarddiskPlugin(),
	],
};

export default config;
