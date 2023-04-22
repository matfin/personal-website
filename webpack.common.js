const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { name, version } = require('./package.json');

const environment = {
  appName: JSON.stringify(name),
  appVersion: JSON.stringify(version),
  cacheName: JSON.stringify(`${name}-${version}`),
  canonicalUrl: JSON.stringify(
    process.env.CANONICAL_URL || 'http://localhost:3000'
  ),
  contentBase: JSON.stringify('./pages'),
  enableCache: JSON.stringify(process.env.ENABLE_CACHE ? true : false),
  outputDir: JSON.stringify('./out'),
};

console.info(environment);

const common = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, '/src/app/'),
      models: path.resolve(__dirname, '/src/models/'),
      utils: path.resolve(__dirname, '/src/utils/'),
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
    path: path.resolve(__dirname, 'out'),
    filename: '[name].bundle.js',
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(environment),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'pages'),
          to: path.resolve(__dirname, 'out/pages'),
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'out'),
        },
      ],
    }),
  ],
};

const ssg = {
  ...common,
  entry: {
    generate: path.resolve(__dirname, 'src/ssg/index.ts'),
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  plugins: [new webpack.DefinePlugin(environment)],
};

module.exports = [client, ssg];
