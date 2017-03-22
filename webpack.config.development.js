const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const headers = { "Access-Control-Allow-Origin": process.env.APP_HOST, "Access-Control-Allow-Credentials": "true" }

const config = {
  entry: {
    application: "./assets/application.js"
  },
  output: {
    path: __dirname + '/public/assets',
    filename: `[name].js`,
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ["babel"]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments'
        )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml&name=[name].[ext]'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url?limit=8192&name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'React': 'react'
    })
  ],
  devtool: '#source-map',
  devServer: {
    headers: headers
  },
  postcss: () => {
    return [ require('postcss-cssnext') ];
  },
}

module.exports = config;
