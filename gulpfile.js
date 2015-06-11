var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


gulp.task('html',[],function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('public'));
});


gulp.task('default',['html']);
