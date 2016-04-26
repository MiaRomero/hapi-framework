'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

let files = ['test/**/*.js', 'server.js', 'gulpfile.js'];

gulp.task('lint:test', () => {
  return gulp.src('./**/*test.js')
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
  .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint({
    envs: [
      'es6'
    ]
  }))
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('./test**/*test.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(files, ['lint:test', 'lint:nontest', 'mocha']);
});

gulp.task('default', ['watch', 'lint:test', 'mocha']);
