const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglifyes');
const pump = require('pump');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

gulp.task('js', function () {
    pump(
        gulp.src('src/js/*.js'),
        concat('main.js'),
        uglify(),
        gulp.dest('dist/js/'),
        function(erro) {
            if(erro) console.log(erro);
        });
});

gulp.task('default', function() {
    gulp.watch('src/js/*.js', ['js']);
});