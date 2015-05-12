var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    app: './src/app.js'
  },
  output: {
    path: './javascripts/',
    publicPath: '/javascripts/',
    filename: 'app.js'
  },
  module: {
    preLoaders: [
      { test: /\.html$/, include: /src|tests/, loader: 'riotjs' },
    ],
    loaders: [
      { test: /\.sjs$/, loader: 'sweetjs?modules[]=../node_modules/sparkler/macros/index.js'},
      { test: /\.css$/, include: /src|tests/, loader: 'style!css' },
      { test: /\.js$|\.html$/, include: /src|tests/, loader: 'babel?stage=1&optional=runtime&blacklist=strict'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  devServer: {
    port: 5555
  },
  devtool: "source-map"
}
