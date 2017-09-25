const gulp = require('gulp')
const webpack = require('webpack')

gulp.task('watch-scripts', () =>
  gulp
    .src(['./src/index.js', './src/sw.js'])
    .pipe(
      require('webpack-stream')({
        watch: true,
        config: require('./webpack.config.js').configs
      })
    )
    .pipe(gulp.dest('www/Colorized'))
)

gulp.task('build-script', () => (
  gulp
    .src(['src/index.js', './src/sw.js'])
    .pipe(
      require('webpack-stream')({
        config: require('./webpack.config.js').configs
      })
    )
    .pipe(require('gulp-babel-minify')({}, {
      comments: false
    }))
    .pipe(gulp.dest('docs'))
))

gulp.task('copy-icon', () =>
  gulp
    .src(['www/Colorized/icons/**'])
    .pipe(gulp.dest('docs/icons'))
)

gulp.task('copy-to-docs', ['copy-icon'], () =>
  gulp
    .src(['www/Colorized/index.html'])
    .pipe(gulp.dest('docs'))
)

gulp.task('build', ['build-script', 'copy-to-docs'])
gulp.task('watch', ['watch-scripts'])
