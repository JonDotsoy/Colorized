const gulp = require('gulp')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

gulp.task('watch-scripts', () =>
    gulp
        .src(['src/index.js'])
        .pipe(
            require('gulp-webpack')({
                watch: true,
                output: {
                    filename: "index.js"
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            exclude: /node_modules/,
                            query: {
                                presets: ['env', 'react','stage-0']
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
    process.env.NODE_ENV = 'production',
    gulp
        .src(['src/index.js'])
        .pipe(
            require('gulp-webpack')({
                output: {
                    filename: "index.js"
                },
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            loader: 'babel-loader',
                            options: {
                                minimize: true,
                            },
                            query: {
                                minified: true,
                                presets: [
                                    'env',
                                    'react',
                                    'stage-0',
                                    'babili'
                                ]
                            }
                        }
                    ]
                },
                plugins: [
                ]
            })
        )
        .pipe(gulp.dest('docs'))
))

gulp.task('copy-to-docs', () => 
    gulp
        .src(['www/index.html'])
        .pipe(gulp.dest('docs'))
)

gulp.task('build', ['build-script', 'copy-to-docs'])
gulp.task('watch', ['watch-scripts'])
