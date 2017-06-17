const gulp = require('gulp');
const plumber = require('gulp-plumber');
const If = require('gulp-if');

const cssnano = require('gulp-cssnano');
const coffee = require('gulp-coffee')
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');


const browserSync = require('browser-sync').create();


const config = {
    assets: {
        all: 'assets/*',
        types: {
            html: 'assets/index.html',
            sass: 'assets/styles.sass',
            coffee: 'assets/script.coffee'
        }
    },
    build: {
        public: './docs',
        dest: './build',
        maps: './maps'
    }
}


function notify(error) {
    console.error(error.toString());
    browserSync.notify(
        `${error.filename}` +
        `<br>${error.message}` +
        `<div style="color: red;">ERROR</div>`,
    1000 * 60 * 60);
    this.emit('finish');
}


gulp.task('browser-sync', () => {
    browserSync.init({
        server: config.build.dest,
        open: false,
        port: 1157
    });
    gulp.watch(config.assets.all)
    .on('change', () => {
        gulp.src(config.assets.all)
        .pipe(plumber(notify))
        .pipe(sourcemaps.init())
            .pipe(If('*.coffee', coffee()))
            .pipe(If('*.sass', sass()))
        .pipe(sourcemaps.write(config.build.maps))
        .pipe(gulp.dest(config.build.dest))
        .on('finish', () => {
            browserSync.reload();
            browserSync.notify(
                `<div style="color: green;">OK</div>`,
            1000);
        });
    });
});


gulp.task('coffee', () =>
    gulp.src(config.assets.types.coffee)
    .pipe(plumber(notify))
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(config.build.dest))
);


gulp.task('sass', () =>
    gulp.src(config.assets.types.sass)
    .pipe(plumber(notify))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(config.build.dest))
);


gulp.task('html', () =>
    gulp.src(config.assets.types.html)
    .pipe(plumber(notify))
    .pipe(htmlmin({
        collapseWhitespace: true,
        html5: true
    }))
    .pipe(gulp.dest(config.build.dest))
);


gulp.task('build', ['coffee', 'sass', 'html']);


gulp.task('publish', ['build'], () =>
    gulp.src(config.build.dest + '/*.*')
    .pipe(gulp.dest(config.build.public))
);
