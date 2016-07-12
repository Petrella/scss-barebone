//All Requirements for the project
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleancss    = require('gulp-clean-css');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// Static Server + watching scss/html files
gulp.task('serve', ['scss'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/*.html", ['views']);
    gulp.watch("src/scss/*.scss", ['scss']);
    gulp.watch("src/css/*.css", ['minify-css']);
    gulp.watch("src/js/*.js", ['minify-js']);
    gulp.watch("dist/*").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('scss', function() {
  return gulp.src("src/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("src/css/"))
      .pipe(browserSync.stream());
});

// Copy changed *.html to dist
gulp.task('views', function() {
  return gulp.src("src/*.html")
      .pipe(gulp.dest("dist/"))
      .pipe(browserSync.stream());
});

// Minify css
gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleancss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

// uglify an concatenate *.js files
gulp.task('minify-js', function() {
    return gulp.src("src/js/*.js")
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
