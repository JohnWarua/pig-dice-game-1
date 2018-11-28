const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
});

gulp.task('styles', () => gulp
  .src('./src/scss/*.scss')
  .pipe(
    plumber(function (err) {
      console.log(err);
      this.emit('end');
    }),
  )
  .pipe(sourcemaps.init())
  .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(cleanCSS({ compatibility: 'ie11' }))
  .pipe(cleanCSS({ level: '2' }))
  .pipe(rename({ suffix: '.min' }))
  .pipe(
    sourcemaps.write('./', {
      sourceMappingURL(file) {
        return `${file.relative}.map`;
      },
    }),
  )
  .pipe(gulp.dest('./public/css/')));

gulp.task('minify-js', () => {
  browserify('./src/js/app.js')
    .transform(babelify, { presets: ['env'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(
      plumber(function (err) {
        console.log(err);
        this.emit('end');
      }),
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(
      sourcemaps.write('./', {
        sourceMappingURL(file) {
          return `${file.relative}.map`;
        },
      }),
    )
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('image-minify', () => {
  gulp
    .src('src/img/*')
    .pipe(
      imagemin([
        imagemin.jpegtran(),
        imagemin.optipng(),
        imagemin.svgo(),
        imageminPngquant(),
        imageminJpegRecompress(),
      ]),
    )
    .pipe(gulp.dest('static/'));
});

// Cleanup public folders
gulp.task('clean', () => del.sync(['public/css/*', 'public/js/*', 'src/css/*', 'static/*.png', 'static/*.jpg']));

gulp.task('build', ['clean', 'styles', 'minify-js', 'image-minify'], () => {
  console.log('Building Project.');
});

gulp.task('watch', ['browser-sync', 'build'], () => {
  console.log('Starting watch task');
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('src/js/app.js', ['minify-js']).on('change', browserSync.reload);
  gulp.watch('src/img/*', ['image-minify']);
});
