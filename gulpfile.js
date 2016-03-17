var gulp          = require('gulp')
var browserSync   = require('browser-sync')
var sass          = require('gulp-sass')
var jade          = require('gulp-jade')

gulp.task('sass', function() {
  gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('jade', function() {
  var YOUR_LOCALS = {}

  gulp.src('src/views/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty:true
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('copy-js-files', function(){
    gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  })
})

gulp.task('default', ['browser-sync', 'sass', 'jade', 'copy-js-files'], function() {
  gulp.watch('src/scss/*.scss', ['sass'])
  gulp.watch('src/views/*.jade', ['jade'])
  gulp.watch('src/js/*.js', ['copy-js-files'])
  gulp.watch('src/**/*', browserSync.reload)
})
