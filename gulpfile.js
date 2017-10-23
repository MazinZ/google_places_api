var gulp  = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var dist = 'app/build/';
var jsFiles = ['app/js/*.js'];
var scssFiles = ['app/scss/*.scss'];

gulp.task('sass', function() {
  return gulp.src(scssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dist));
});

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
  gulp.watch(jsFiles, ['js']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('default', ['js', 'sass'], function() {
  console.log('Build finished.');
});
