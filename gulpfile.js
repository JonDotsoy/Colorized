const gulp = require('gulp')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

gulp.task('watch-scripts', () =>
    gulp
        .src(['src/index.js'])
        .pipe(
            require('webpack-stream')({
              watch: true,
              output: {
                filename: 'index.js'
              },
              module: {
                loaders: [
                  {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                      presets: ['env', 'react', 'stage-0'],
                      plugins: ['transform-optional-chaining']
                    }
                  }
                ]
              },
              plugins: [
                new BrowserSyncPlugin({
                  logFileChanges: false,
                  logConnections: false,
                  host: 'localhost',
                  port: 3000,
                  server: {
                    baseDir: [ 'www' ]
                  }
                })
              ]
            })
        )
        .pipe(gulp.dest('www'))
)

gulp.task('build-script', () => (
    gulp
        .src(['src/index.js'])
        .pipe(
            require('webpack-stream')(
            {
              output: {
                filename: 'index.js'
              },
              module: {
                loaders: [
                  {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                      presets: ['env', 'react', 'stage-0'],
                      plugins: ['transform-optional-chaining'],
                      comments: false
                    }
                  }
                ]
              },
              plugins: [
                new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify('production')
                })
              ]
            },
            require('webpack')
          )
        )
        .pipe(require('babel-minify')({}, {}))
        .pipe(gulp.dest('docs'))
))

gulp.task('copy-to-docs', () =>
    gulp
        .src(['www/index.html'])
        .pipe(gulp.dest('docs'))
)

gulp.task('build', ['build-script', 'copy-to-docs'])
gulp.task('watch', ['watch-scripts'])
