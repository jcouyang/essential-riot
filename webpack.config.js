var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
const sassLoaders = [
  "css-loader",
  "autoprefixer-loader?browsers=last 2 version",
  "sass-loader?includePaths[]=" + path.resolve(__dirname, "./scss"),
];
module.exports = {
  cache: true,
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './javascripts/',
    publicPath: '/javascripts/',
    filename: '[name].js'
  },
  module: {
    preLoaders: [
      { test: /\.html$/, include: /src|tests/, loader: 'riotjs' },
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", sassLoaders.join("!")),
      },
      { test: /\.sjs$/, loader: 'sweetjs?modules[]=../node_modules/sparkler/macros/index.js'},
      { test: /\.js$|\.html$/, include: /src|tests/, loader: 'babel?stage=1&optional=runtime&blacklist=strict'},
    ]
  },
  resolve: {
    modulesDirectories: ["src", "node_modules", "bower_components", "scss"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    }),
    new ExtractTextPlugin('../stylesheets/[name].css')
  ],
  devServer: {
    port: 5555
  },
  devtool: "source-map"
}
