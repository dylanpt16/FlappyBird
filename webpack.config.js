var path = require('path');
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: './src/FlappyBird.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
};
