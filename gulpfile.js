const gulp = require('gulp')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

gulp.task('watch-scripts', () =>
    gulp
        .src(['src/index.js'])
        .pipe(
            require('webpack-stream')({
              watch: true,
              config: [

                {
                  entry: {
                    filename: './src/index.js'
                  },
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
                          presets: [
                            'env',
                            'react',
                            'stage-0'
                          ],
                          plugins: [
                          ]
                        }
                      }
                    ]
                  },
                  plugins: [
                    new BrowserSyncPlugin({
                      startPath: '/Colorized',
                      logFileChanges: false,
                      logConnections: false,
                      host: 'localhost',
                      port: 3000,
                      server: {
                        baseDir: [ 'www' ]
                      }
                    })
                  ]
                },

                {
                  watch: true,
                  entry: {
                    filename: './src/sw.js'
                  },
                  output: {
                    filename: 'sw.js'
                  },
                  module: {
                    loaders: [
                      {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        options: {
                          presets: [
                            'env',
                            'react',
                            'stage-0'
                          ],
                          plugins: [
                          ]
                        }
                      }
                    ]
                  }
                }

              ]
            })
        )
        .pipe(gulp.dest('www/Colorized'))
)

gulp.task('build-script', () => (
    gulp
        .src(['src/index.js'])
        .pipe(
            require('webpack-stream')(

              {
              config: [

                {
                  entry: {
                    filename: './src/index.js'
                  },
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
                          presets: [
                            'env',
                            'react',
                            'stage-0'
                          ],
                          plugins: [
                          ]
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

                {
                  watch: true,
                  entry: {
                    filename: './src/sw.js'
                  },
                  output: {
                    filename: 'sw.js'
                  },
                  module: {
                    loaders: [
                      {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/,
                        options: {
                          presets: [
                            'env',
                            'react',
                            'stage-0'
                          ],
                          plugins: [
                          ]
                        }
                      }
                    ]
                  },
                  plugins: [
                    new webpack.DefinePlugin({
                      'process.env.NODE_ENV': JSON.stringify('production')
                    })
                  ]
                }

              ]
            }

          )
        )
        .pipe(require('gulp-babel-minify')({}, {
          comments: false
        }))
        .pipe(gulp.dest('docs'))
))

gulp.task('copy-to-docs', () =>
  gulp
    .src(['www/Colorized/index.html'])
    .pipe(gulp.dest('docs'))
)

gulp.task('build', ['build-script', 'copy-to-docs'])
gulp.task('watch', ['watch-scripts'])
