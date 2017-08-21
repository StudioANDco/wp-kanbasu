var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');

var src = {
  scss: 'sass/**/*.scss',
  css:  '../'
};

var config = {
    browsers: 'last 2 versions, ie 9'
};

/**
 * Watching files for changes
 */
gulp.task('watch', ['sass'], function() {
  gulp.watch(src.scss, ['sass']);
});

/**
 * Compile Sass
 */
gulp.task('sass', function() {
  return gulp.src(src.scss)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(prefix(config.browsers))
    .pipe(gulp.dest(src.css));
});

gulp.task('default', ['watch']);
