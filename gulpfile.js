var gulp = require('gulp'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  filter = require('gulp-filter'),
  sass = require('gulp-sass');

gulp.task('clean', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

gulp.task('css', function() {
  return gulp.src([
      'sass/**/*.scss',
      '!sass/**/_*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('build:css', ['clean'], function(cb) {
  return runSequence('css', cb);
});

gulp.task('copy', function() {

  return gulp.src([
      '**/*',
      '!scss/**/*',
      '!dist/**/*',
      '!node_modules/**/*',
      '!gulpfile.js',
      '!package.json',
      '!template-files/**/*',
      '!Documentation/**/*',
      '!content/**/*',
      '!unused-img/**/*',
      '!.*'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function(cb) {
  runSequence('copy', 'css', cb);
});

gulp.task('default', ['build']);