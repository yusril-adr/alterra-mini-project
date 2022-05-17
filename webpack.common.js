const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: [path.resolve(__dirname, 'src/scripts/index.jsx')],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // File loader for font
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      favicon: path.resolve('src/public/images/logo.png'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Wallet Manager Lite',
      short_name: 'Wager-lite',
      description: 'An app that will help you to organize your personal cashflow.',
      start_url: '/',
      display: 'standalone',
      theme_color: '#1565c0',
      background_color: '#1976D2',
      inject: true,
      fingerprints: true,
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/logo.png'),
          sizes: [192, 256, 384, 512],
          ios: true,
          destination: 'images',
          purpose: 'any maskable',
        },
      ],
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, './src/scripts/service-worker.js'),
      maximumFileSizeToCacheInBytes: 1000000 * 6, // 6 mb
      swDest: 'service-worker.js',
    }),
    new Dotenv(),
  ],
};
