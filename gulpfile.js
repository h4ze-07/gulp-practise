const gulp = require('gulp');
const include = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minify = require("gulp-babel-minify");

function html() {
    return gulp.src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(gulp.dest('dist'))
}


function styles() {
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
      }))
      .pipe(csso())
      .pipe(concat('style.css'))
      .pipe(gulp.dest('dist/css'));
}


function scripts() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(minify({
            mangle: {
            keepClassName: true
            }
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

function watch() {
    gulp.watch('src/**.html', html)
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;

exports.watch = watch;