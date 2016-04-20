var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var pg              = require('gulp-load-plugins')();
var mainBowerFiles  = require('main-bower-files');
var watching        = true;

gulp.task('copy-components', function(){
  gulp.src(mainBowerFiles())
  .pipe(gulp.dest('dist/components'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
    .pipe(pg.sourcemaps.init())
    .pipe(watching ? pg.plumber() : pg.guitl.noop())
    .pipe(pg.sass())
    .pipe(pg.autoprefixer('last 2 version'))
    .pipe(pg.concat('style.min.css'))
    .pipe(pg.yuicompressor({
    			type: 'css'
    		}))
    .pipe(pg.sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('src/views/*.jade')
    .pipe(watching ? pg.plumber() : pg.guitl.noop())
    .pipe(pg.jade({
      locals: YOUR_LOCALS
      ,pretty:true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function(){
  gulp.src('src/js/*.js')
  .pipe(pg.sourcemaps.init())
  .pipe(pg.jshint())
  .pipe(pg.jshint.reporter('default'))
  .pipe(pg.concat('main.min.js'))
	.pipe(pg.uglify())
  .pipe(watching ? pg.plumber() : pg.guitl.noop())
  .pipe(pg.sourcemaps.write())
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false
  });
});

gulp.task('default', ['browser-sync', 'copy-components', 'sass', 'js', 'templates' ], function() {
  gulp.watch('bower_components/**', ['copy-components']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/views/*.jade', ['templates']);
});
