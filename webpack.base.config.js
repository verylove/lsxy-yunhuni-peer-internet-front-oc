var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './app/main.js',
  output: {
    path: './static',
    //Watching your source files for changes and when changes are made the
    //bundle will be recompiled. This modified bundle is served from memory at
    // the relative path specified in publicPath (see API).
    publicPath: 'static/',
    filename: 'build.js'
  },
  module: {
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file?name=[name].[ext]?[hash]'
      },
      { test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}
