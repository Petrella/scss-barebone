// All Requirements for the project
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var cleancss    = require('gulp-clean-css');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');

// base directories
var bases = {
 src: 'src/',
 dist: 'dist/',
};

// project paths
var paths = {
 script: ['src/js/**/*.js'],
 scss: ['src/scss/**/*.scss'],
 css: ['dist/css/**/*.scss'],
 html: ['index.html'],
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

// Static Server + watching scss/html files
gulp.task('dev', ['scss'], function() {

    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/*.html', ['views']);
    gulp.watch('src/scss/*.scss', ['scss']);
    gulp.watch('src/css/*.css', ['copy-css']);
    gulp.watch('src/css/maps/*.map', ['sourcemap']);
    gulp.watch('src/lib/*.js', ['copy-lib']);
    gulp.watch('src/js/*.js', ['minify-js']);
    gulp.watch('dist/*').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('scss', function() {
  return gulp.src('src/scss/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write(('maps')))
      .pipe(gulp.dest('src/scss/'))
      .pipe(browserSync.stream());
});

// Copy changed *.html to dist
gulp.task('views', function() {
  return gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
});

// copy css to dist/css/
gulp.task('copy-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.stream());
});

// Copy sourcemap to dist
gulp.task('sourcemap', function() {
  return gulp.src('src/scss/maps/*.css.map')
      .pipe(gulp.dest('dist/css/maps'))
      .pipe(browserSync.stream());
});

// Copy lib to dist
gulp.task('copy-lib', function() {
  return gulp.src('src/lib/**/**/*.js')
      .pipe(gulp.dest('dist/lib'))
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
    return gulp.src('src/js/*.js')
        .pipe(rename('script.concat.js'))
        .pipe(concat('script.concat.js'))
        .pipe(gulp.dest('src/js-concat'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream());
});

// Delete the dist directory
gulp.task('dist-clean', function() {
 return gulp.src(bases.dist)
        .pipe(clean());
});

gulp.task('default', ['dev']);
