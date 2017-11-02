var gulp = require("gulp");
var eslint = require('gulp-eslint');
var webpack = require("webpack");
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack/webpack.config.js');

gulp.task('lint', function() {
  return gulp.src(
    [
      'src/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('server', function() {
  new WebpackDevServer(webpack(config), {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true
  }).listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:3000/');
  });
});