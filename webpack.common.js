const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  target: 'web',
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
};

module.exports = [client, server];
