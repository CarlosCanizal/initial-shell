var gulp = require('gulp');
var paths = require('./gulp/gulp.config.json');
// var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();

gulp.task('default', ['watch','jade','sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade', 'sass']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.sass({sourceComments:'normal'}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
    .pipe($.size());
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
});

gulp.task('scripts', function () {
  return gulp.src('app/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('src/client/app/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    // .pipe($.ngHtml2js({
    //   moduleName: "htmlTemplates.js",
    //   prefix: "partials/"
    // }))
    .pipe(gulp.dest(".tmp/partials"))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});