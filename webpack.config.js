const path = require('path');
const webpack = require("webpack");

const StringReplacePlugin = require("string-replace-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	entry: {
		'pdfmake'    : './src/browser/pdfMake.js',
		'pdfmake.min': './src/browser/pdfMake.js',

		'vfs': './assets/index.js',
	},

	output: {
		path: path.join(__dirname, './build'),
		filename: '[name].js',
		libraryTarget: 'umd'
	},

	resolve: {
		extensions: ['*', '.js', '.json', '.coffee'],
		alias: {
			fs     : path.join(__dirname, './src/browser/virtual-fs.js'),
			pdfkit$: path.join(__dirname, './src/pdfkit/document'),
			pdfkit : path.join(__dirname, './src/pdfkit'),
		}
	},

	devtool: "source-map",
	cache: true,

	module: {
		rules: [
			{ test: /\.coffee$/, loader: 'coffee-loader'       },
			{ test: /\.json$/  , loader: 'json-loader'         },
			{ test: /\.ttf$/   , loader: 'base64-loader'       },
			{ test: /\.png$/   , loader: 'base64-image-loader' },
			{ test: /\.jpg$/   , loader: 'base64-image-loader' },

			// virtual fs
			{
				test: /fontkit[\/\\]index.js$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /fs\./g,
						replacement: () => 'require(\'fs\').',
					}]
				}),
			},

			// hack for Web Worker support
			{
				test: /file-saver[\/\\]FileSaver.js$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
							pattern: 'doc.createElementNS("http://www.w3.org/1999/xhtml", "a")',
							replacement: () => 'doc ? doc.createElementNS("http://www.w3.org/1999/xhtml", "a") : []',
					}]
				}),
			},

			// browser fs
			{
				enforce: 'post',
				test: [
					/fontkit[\/\\]index\.js$/,
					/unicode-properties[\/\\]index\.js$/,
					/linebreak[\/\\]src[\/\\]linebreaker\.js/,
				],
				use: [{
					loader: 'transform-loader',
					options: { brfs: true },
				}],
			},
		]
	},

	plugins: [
		new StringReplacePlugin(),

		new UglifyJsPlugin({
			cache: true,
			sourceMap: true,
			test: /\.min\.js$/,

			uglifyOptions: {
				compress: {
					drop_console: true
				},
				mangle: {
					reserved: [
						'HeadTable', 'NameTable', 'CmapTable',
						'HheaTable', 'MaxpTable', 'HmtxTable',
						'PostTable', 'OS2Table' , 'LocaTable',
						'GlyfTable'
					]
				}
			}
		}),


	]
};
