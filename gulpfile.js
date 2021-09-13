const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');



gulp.task('autoprefixer-css', () => {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css/'));
});
gulp.task('minify-js', () => {
    return pipeline(
        gulp.src('app/js/**/*.*'),
        uglify(),
        gulp.dest('public/js/')
    );
});

gulp.task('compress', async function() {
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/'))
        // .pipe(connect.reload());
});
gulp.task('serve', () => {
    browserSync.init({
        server: 'public'
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});
gulp.task('watch', async () => {
    gulp.watch('app/scss/*.scss', gulp.series('sassToCSS'));
    gulp.watch('.html');
    gulp.watch('app/css/*.css', gulp.series('autoprefixer-css'));
    gulp.watch('app/js/**/*.*', gulp.series('minify-js'));
    gulp.watch('app/img/*', gulp.series('compress'));
});
gulp.task('sassToCSS', () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css/'));
});


gulp.task('default', gulp.parallel('watch','serve'));