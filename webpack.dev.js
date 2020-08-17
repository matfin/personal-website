const { merge } = require('webpack-merge');
const [client, server] = require('./webpack.common');

const devclient = merge(client, {
  mode: 'development',
  devtool: 'inline-source-map',
});

const devserver = merge(server, {
  mode: 'development',
});

module.exports = [devclient, devserver];
