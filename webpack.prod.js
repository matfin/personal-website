const merge = require('webpack-merge');
const [client, server] = require('./webpack.common');

const devclient = merge(client, {
  mode: 'production',
  devtool: 'source-map',
});

const devserver = merge(server, {
  mode: 'production',
});

module.exports = [devclient, devserver];
