var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var pg            = require('gulp-load-plugins')();
var watching      = true;
var reload        = browserSync.reload;

gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
    .pipe(watching ? pg.plumber() : pg.guitl.noop())
    .pipe(pg.sass())
    .pipe(pg.autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('sass-watch', ['sass'], reload);

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('src/views/*.jade')
    .pipe(watching ? pg.plumber() : pg.guitl.noop())
    .pipe(pg.jade({
      locals: YOUR_LOCALS
      ,pretty:true
    }))
    .pipe(gulp.dest('dist/'));
});
gulp.task('jade-watch', ['templates'], reload);

gulp.task('js', function(){
  gulp.src('src/js/*.js')
  .pipe(pg.concat('main.js'))
	.pipe(pg.uglify())
  .pipe(pg.jshint())
  .pipe(pg.jshint.reporter('default'))
  .pipe(watching ? pg.plumber() : pg.guitl.noop())
  .pipe(gulp.dest('dist/js'));
});
gulp.task('js-watch', ['js'], reload);

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('default', ['browser-sync', 'sass', 'js', 'templates' ], function() {
  gulp.watch('src/scss/*.scss', ['sass-watch']);
  gulp.watch('src/js/*.js', ['js-watch']);
  gulp.watch('src/views/*.jade', ['jade-watch']);
});
