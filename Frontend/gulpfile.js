'use strict';

// TODO: make this file work

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    liveReload = require('gulp-livereload'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    cssMinify = require('gulp-minify-css'),
    cssLint = require('gulp-csslint'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {

    liveReload.listen();

    gulp.watch('./styles/*.scss', ['style']);
    gulp.watch(['./scripts/*.js', './scripts/*.jsx'] ['script']);

});

gulp.task('script', function() {
   gulp.src(['./scripts/react.js', './sripts/react-dom.js', './scripts/reactTemp.js', './scripts/*.js'])
    .pipe(sourceMaps.init())
    .pipe(babel({
           presets: ['es2015']
    }))
    .pipe(concat('app.min.js'))
    // .pipe(uglify())
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(liveReload());
});

gulp.task('style', function() {
  gulp.src(['./style/reset.css', './styles/*.scss'])
    .pipe(sass())
    .pipe(cssLint({
        'ids': false
    }))
    .pipe(sourceMaps.init())
    .pipe(cssMinify())
    .pipe(concat('screen.min.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/styles/'))
    .pipe(notify({
        message: 'CSS build.'
    }))
    .pipe(liveReload());
});