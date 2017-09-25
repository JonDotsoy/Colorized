const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const inlineEnvironmentVariablesPlugin = new InlineEnvironmentVariablesPlugin()
const browserSyncPlugin = new BrowserSyncPlugin({
  startPath: '/Colorized',
  logFileChanges: false,
  logConnections: false,
  host: 'localhost',
  port: 3000,
  server: {
    baseDir: [ 'www' ]
  }
})

module.exports.browserSync = browserSyncPlugin.browserSync

module.exports.configs = [
  {
    entry: { filename: './src/index.js' },
    output: { filename: 'index.js' },
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
      inlineEnvironmentVariablesPlugin,
      browserSyncPlugin
    ]
  },

  {
    entry: { filename: './src/sw.js' },
    output: { filename: 'sw.js' },
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
      inlineEnvironmentVariablesPlugin,
      browserSyncPlugin
    ]
  }

]
