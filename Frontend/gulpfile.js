'use strict';

var gulp = require('gulp'),
    less = require('gulp-sass'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {

    liveReload.listen();

    gulp.watch('./styles/*.less', ['style']);
    gulp.watch('./scripts/*.js', ['script']);

});

gulp.task('script', function() {
   gulp.src('./scripts/*.js')
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(livereload());
});

gulp.task('style', function() {
  gulp.src('./styles/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/styles/'))
    .pipe(livereload());
});