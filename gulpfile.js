"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open') //open a URL in a we browser
var browserify = require('browserify'); //bundle js
var reactify = require('reactify'); // transform react jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat'); //concat files
var lint = require('gulp-eslint');

var config = {
    port: 9005,
    devBaseUrl: "http://localhost",
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images',
        css: ['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'],
        dist: './dist',
        mainJs: './src/main.js'
    }
}

//Start a local dev server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//first runs the connect task, then opens the index in browser
gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

//this task puts the files in destination path
gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());

    //publish fav icon
    // gulp.src('./src/favicon.ico')
    //     .pipe(gulp.dest(config.paths.dist));
});


gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('lint', function () {
    return gulp.src(config.paths.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
});
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);