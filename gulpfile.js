"use strict";
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    rimraf = require('rimraf'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    image = require('gulp-image'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer');

gulp.task('server', function() {
    browserSync.init({
      server: {
        port: 3000,
        baseDir: "./app"
      }
    });
});

gulp.task('styles', function(){
  gulp.src('./app/sass/**/**.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 15 versions']
    }))
    .pipe(gulp.dest('./app/css') )
    .pipe(browserSync.stream());
});

gulp.task('clean', function(cb) {
  rimraf('./build' , cb);
});
gulp.task('image',['clean'], function () {
  gulp.src('app/img/*')
    .pipe(image())
    .pipe(gulp.dest('./build/img'));
});
gulp.task('fonts',['clean'], function () {
  gulp.src('app/fonts/*')
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build', ['clean'], function(){
  gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', csso()))
    .pipe(gulp.dest('./build'))
})


gulp.task('deploi', function () {
    // return gulp.src('build/**/**')
    //     .pipe(ftp({
    //         host: 'hostname',
    //         user: 'username',
    //         pass: 'pass'
    //     }))
    //     .pipe(gutil.noop());
});

gulp.task('watch', function(){
  gulp.watch('./app/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['watch', 'server']);
gulp.task('prod', ['build','image', 'fonts' ,'deploi'])
