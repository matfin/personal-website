const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Visuaulizer = require('webpack-visualizer-plugin');

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
      'app': path.resolve(__dirname, 'src/app/'),
      'common': path.resolve(__dirname, 'src/common/'),
      'server': path.resolve(__dirname, 'src/server/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

const client = {
  ...common,
  entry: {
    main: path.resolve(__dirname, 'src/app/index.tsx'),
    worker: path.resolve(__dirname, 'src/app/worker.ts'),
  },
  plugins: [
    new Visuaulizer({
      filename: './stats.html',
    }),
  ],
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
