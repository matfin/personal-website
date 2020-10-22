const path = require('path');
const webpack = require('webpack');
const { name, version } = require('./package.json');
const nodeExternals = require('webpack-node-externals');
const webpackNodeExternals = require('webpack-node-externals');

const environment = {
  apiUrl: JSON.stringify(process.env.API_URL || 'http://localhost'),
  appName: JSON.stringify(name),
  appVersion: JSON.stringify(version),
  cacheName: JSON.stringify(`${name}-${version}`),
  canonicalUrl: JSON.stringify(process.env.CANONICAL_URL || 'http://localhost:3000'),
  enableCache: JSON.stringify(process.env.ENABLE_CACHE ? true : false),
  isProduction: JSON.stringify(process.env.IS_PRODUCTION ? true : false),
  port: JSON.stringify(process.env.PORT || '3000'),
};

console.log(environment);

const common = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      }
    ],
  },
  resolve: {
    alias: {
      'app': path.resolve(__dirname, 'src/app/'),
      'common': path.resolve(__dirname, 'src/common/'),
      'server': path.resolve(__dirname, 'src/server/'),
      'svg': path.resolve(__dirname, 'assets/images/svg/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json', '.svg'],
  },
};

const client = {
  ...common,
  entry: {
    main: path.resolve(__dirname, 'src/app/index.tsx'),
    worker: path.resolve(__dirname, 'src/app/worker.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/app'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      ...environment,
      isServer: JSON.stringify(false),
    }),
  ]
};

const server = {
  ...common,
  entry: path.resolve(__dirname, 'src/server'),
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: 'server.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      ...environment,
      isServer: JSON.stringify(true),
    }),
  ],
};

module.exports = [client, server];
