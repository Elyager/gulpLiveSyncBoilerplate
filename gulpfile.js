var gulp          = require('gulp')
var browserSync   = require('browser-sync')
var sass          = require('gulp-sass')
var jade          = require('gulp-jade')
var plumber       = require('gulp-plumber')
var gutil         = require('gulp-util')
var concat        = require('gulp-concat')
var uglify        = require('gulp-uglify')
var autoprefixer  = require('gulp-autoprefixer')
var jshint        = require('gulp-jshint')
var watching      = true
var reload        = browserSync.reload;

gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
    .pipe(watching ? plumber() : gutil.noop())
    .pipe(sass())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
})
gulp.task('sass-watch', ['sass'], reload)

gulp.task('templates', function() {
  var YOUR_LOCALS = {}

  gulp.src('src/views/*.jade')
    .pipe(watching ? plumber() : gutil.noop())
    .pipe(jade({
      locals: YOUR_LOCALS
      ,pretty:true
    }))
    .pipe(gulp.dest('dist/'))
})
gulp.task('jade-watch', ['templates'], reload)

gulp.task('js', function(){
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
	.pipe(uglify())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(watching ? plumber() : gutil.noop())
  .pipe(gulp.dest('dist/js'))
})
gulp.task('js-watch', ['js'], reload)

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
})

gulp.task('default', ['browser-sync', 'sass', 'js', 'templates' ], function() {
  gulp.watch('src/scss/*.scss', ['sass-watch'])
  gulp.watch('src/js/*.js', ['js-watch'])
  gulp.watch('src/views/*.jade', ['jade-watch'])
})
