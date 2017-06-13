const gulp = require('gulp');

const cssnano = require('gulp-cssnano');
const coffee = require('gulp-coffee')
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');


const browserSync = require('browser-sync').create();


const dest = './build';
const maps = './maps';


gulp.task('browser-sync', () => {
    browserSync.init({
        server: 'build/',
        open: false,
        port: 1157
    });
    gulp.watch('build/*')
        .on('change', browserSync.reload);
});


gulp.task('coffee', () =>
    gulp.src('assets/script.coffee')
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest(dest)));


gulp.task('sass', () =>
    gulp.src('assets/styles.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest(dest)));


gulp.task('html', () =>
    gulp.src('assets/index.html')
        .pipe(sourcemaps.init())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(sourcemaps.write(maps))
        .pipe(gulp.dest(dest)));


gulp.task('build', ['coffee', 'sass', 'html']);


gulp.task('live-build', () =>
    gulp.watch('assets/*')
        .on('change', () =>
            gulp.start('build')));
