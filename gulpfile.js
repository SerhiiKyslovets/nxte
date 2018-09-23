'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rimraf = require('rimraf');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');

var config = {
  server: {
      baseDir: "./dist"
  },

  online: false,
  tunel: true,
  host: 'localhost',
  port: 9001,
  open: 'local'
};

var path = {
  src: {
    html: "./src/*.html",
    styles: "./src/styles/main.sass",
    img: "./src/img/**/*.*",
    js: "./src/js/main.js"
  },

  dist: {
    html: "./dist/",
    styles: "./dist/styles/",
    img: "./dist/img/",
    js: "./dist/js/"
  },

  watch: {
    html: "./src/**/*.html",
    styles: "./src/styles/main.sass",
    img: "./src/img/",
    js: "./src/js/main.js"
  },

  clear: "./dist"
};

gulp.task('clear', function (cb) {
  rimraf(path.clear, cb);
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html));
});

gulp.task('styles', function () {
  return gulp.src(path.src.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer('last 2 versions'))
    .pipe(gulp.dest(path.dist.styles))
    .pipe(browserSync.stream());
});

gulp.task('img', function () {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.dist.img));
})

gulp.task('js', function () {
  gulp.src(path.src.js)
    .pipe(gulp.dest(path.dist.js));
})

gulp.task('server', ['compile'], function () {
  browserSync.init(config);

  gulp.watch([path.watch.html], ['html']).on('change', browserSync.reload);
  gulp.watch([path.watch.styles], ['styles']);
  gulp.watch([path.watch.img], ['img']);
  gulp.watch([path.watch.js], ['js']).on('change', browserSync.reload);
});

gulp.task('compile', ['html', 'styles', 'img', 'js']);
gulp.task('default', ['server']);
