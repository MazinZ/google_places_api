var gulp  = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


var dist = 'app/build/';
var rootJsFiles = 'app/js/*.js';
var appJsFiles = 'app/js/**/*.js';

gulp.task('sass', function() {
  return gulp.src(['app/scss/**/*.scss', 'app/scss/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest(dist));
});

gulp.task('js', function() {
  return gulp.src(['!app/js/external/**/*', rootJsFiles, appJsFiles, 'app/js/**/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
  gulp.watch(['app/js/**/*', 'app/js/*', 'app/js/**/**/*.js'], ['js']);
  gulp.watch(['app/scss/**/*'], ['sass']);
});

gulp.task('default', ['js', 'sass'], function() {
  console.log('Building and watching.')
});