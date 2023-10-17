const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('./node_modules/webpack');

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.js', 'webpack-hot-middleware/client'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
};