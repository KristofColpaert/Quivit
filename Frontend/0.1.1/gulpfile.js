var gulp = require('gulp'),
    browserify = require('browserify'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    sass = require('gulp-sass'),
    liveReload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    cssMinify = require('gulp-minify-css'),
    cssLint= require('gulp-csslint'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

gulp.task('default', function() {
    liveReload.listen();

    gulp.watch('./styles/*.scss', ['style']);
    gulp.watch(['./scripts/**/*.jsx', './scripts/**/*js'], ['script']);
});

gulp.task('script', function() {
    browserify('./scripts/app.jsx')
        .transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .pipe(vinylSourceStream('app.min.js'))
        .pipe(vinylBuffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('./public/scripts'))
        // .pipe(notify({
        //     message: 'JS build.'
        // }))
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
        // .pipe(notify({
        //     message: 'CSS build.'
        // }))
        .pipe(liveReload());
});