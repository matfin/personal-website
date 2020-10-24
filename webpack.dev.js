const { merge } = require('webpack-merge');
const [client, server] = require('./webpack.common');

const devclient = merge(client, {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
});

const devserver = merge(server, {
  watch: true,
  mode: 'development',
});

module.exports = [devclient, devserver];
