const path = require('path');
const exec = require('child_process').exec;
const { merge } = require('webpack-merge');
const [client, ssg] = require('./webpack.common');

const devclient = merge(client, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('AfterEmitPlugin', () => {
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
      },
    },
  ],
});

const devssg = merge(ssg, {
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'out'),
    },
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
});

module.exports = [devclient, devssg];
