const gulp = require('gulp')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const browserSyncPlugin = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: {
        baseDir: [ 'www' ]
    }
})
const bs = browserSyncPlugin.browserSync

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
                    browserSyncPlugin
                ]
            })
        )
        .pipe(gulp.dest('www'))
)

gulp.task('watch', ['watch-scripts'])
