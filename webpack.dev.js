const path = require('path');
const exec = require('child_process').exec;
const { merge } = require('webpack-merge');
const [client, ssg] = require('./webpack.common');

const devclient = merge(client, {
  watch: true,
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          exec('yarn ssg', (err, stdout, stderr) => {
            if (err) {
              process.stderr.write(err);
            }
            if (stdout) {
              process.stdout.write(stdout);
            }
            if (stderr) {
              process.stderr.write(stderr);
            }
          });
        });
      }
    }
  ]
});

const devssg = merge(ssg, {
  watch: true,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'out'),
    port: 3000,
    writeToDisk: true,
  }
});

module.exports = [
  devclient,
  devssg,
];
