var gulp        = require('gulp')
var browserSync = require('browser-sync')
var nib         = require('nib')
var stylus      = require('gulp-stylus')
var reload      = browserSync.reload

gulp.task('copyfonts', function() {
   gulp.src('./src/fonts/**/*.{ttf,woff,eot,svg}', { base: 'src/fonts/'})
   .pipe(gulp.dest('./dist/fonts/'));
});
    
gulp.task('copy', function() {
  gulp.src(['src/index.html'])
  .pipe(gulp.dest('./dist/'))
  .pipe(reload({ stream: true }))
})

gulp.task('stylus', function() {
  gulp.src('src/styles/main.styl')
    .pipe(stylus({ use: nib(), compress: true }))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(reload({ stream: true }))
})

gulp.task('serve', [
  //'copyfonts',
  'stylus', 
  'copy',
  'copyfonts',
  ], function() {
  browserSync({
    server: {
      baseDir: './dist/'
    }
  });
  gulp.watch('./src/index.html', ['copy'])
  gulp.watch('./src/styles/**/*.styl', ['stylus'])
})