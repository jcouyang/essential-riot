module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['Firefox'],
    files: [
      // all files ending in "_test"
      'tests/*_test.js',
      'tests/**/*_test.js'
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'tests/*_test.js': ['webpack'],
      'tests/**/*_test.js': ['webpack']
    },

    webpack: {
      module: {
        preLoaders: [
          { test: /\.html$/, include: /tests|src/, loader: 'riotjs' },
        ],
        loaders: [
          { test: /\.sjs$/, loader: 'sweetjs?modules[]=../node_modules/sparkler/macros/index.js'},
          { test: /\.css$/, include: /tests/, loader: 'style!css' },
          { test: /\.js$|\.html$/, include: /tests|src/, loader: 'babel?stage=1&optional=runtime&blacklist=strict'}
        ]
      }
    },
    webpackServer: {
      noInfo: true,
    },
    plugins: [
      "karma-webpack",
      "karma-jasmine",
      'karma-firefox-launcher'
    ]

  });
};
