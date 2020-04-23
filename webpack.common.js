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
      'app/common': path.resolve(__dirname, 'src/common/'),
      'app/components': path.resolve(__dirname, 'src/components'),
      'server/common': path.resolve(__dirname, 'server/common'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};

const client = {
  ...common,
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx'),
    worker: path.resolve(__dirname, 'src/worker.ts'),
  },
  plugins: [
    new Visuaulizer({
      filename: './stats.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/app'),
    filename: '[name].bundle.js',
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
  entry: path.resolve(__dirname, 'server'),
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
