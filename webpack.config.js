const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    clean: true
  },
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: [/\.scss$/, /\.css$/],
        loader: ExtractTextPlugin.extract('style','css!sass')
      },
      // {
      //   test: /\.(s(a|c)ss)$/,
      //   loader: ['style-loader','css-loader', 'sass-loader']
      // }
    ],
  },
  plugins: [
    new ExtractTextPlugin("src/[name].css"),
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + '/public/' + 'index.html',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: true
      }
    })
  ],
  devServer: {
    port: 3000,
    contentBase: 'dist',
    hot: true
  },
  devtool: 'source-map',
};