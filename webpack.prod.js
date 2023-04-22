const { merge } = require('webpack-merge');
const [client, ssg] = require('./webpack.common');

const prodclient = merge(client, {
  mode: 'production',
});

const prodssg = merge(ssg, {
  mode: 'production',
});

module.exports = [prodclient, prodssg];
