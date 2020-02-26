const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  mode: 'development',
  watch: true,
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    filename: 'main.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(scss|sass)$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ]
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      maxSize: 300000,
    }
  },
  plugins: [
    new WebpackAssetsManifest()
  ],
};