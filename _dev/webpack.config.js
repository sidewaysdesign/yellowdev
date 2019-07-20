const path = require('path'),
settings = require('./settings');

module.exports = {
  entry: {
    appForms: "./js/forms.js"
  },
  output: {
    path: path.resolve(__dirname, "../js"),
    filename: "scripts-bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      }
    ]
  }
}
