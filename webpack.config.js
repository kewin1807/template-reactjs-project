const {
  DllReferencePlugin
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require('webpack');

// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const isDevelopment = !(process.env.NODE_ENV === 'production');

const htmlWebpackPluginOptions = {
  inject: true,
  template: path.resolve(__dirname, 'public', 'index.html'),
  vendor: null,
  react: null,
  redux: null,
  fluentui: null,
  uifabric: null,
  rc: null,
  icon: null
};

const plugins = [];
if (isDevelopment) {
  const dllEntries = ['vendor', 'react', 'redux', 'fluentui', 'uifabric', 'rc', 'icon'];
  dllEntries.forEach(item => {
    const manifestFile = path.join(__dirname, 'build', `${item}-manifest.json`);
    if (!fs.existsSync(manifestFile)) {
      execSync('node_modules/.bin/webpack --config webpack.vendor.config', {
        stdio: 'inherit',
        env: process.env,
        cwd: process.cwd()
      });
    }
    plugins.push(
      new DllReferencePlugin({
        context: __dirname,
        manifest: manifestFile,
        scope: "./src"
      })
    );
  });
  htmlWebpackPluginOptions.vendor = path.join(__dirname, 'build', 'vendor.bundle.js');
  htmlWebpackPluginOptions.react = path.join(__dirname, 'build', 'react.bundle.js');
  htmlWebpackPluginOptions.redux = path.join(__dirname, 'build', 'redux.bundle.js');
  // htmlWebpackPluginOptions.fluentui = path.join(__dirname, 'build', 'fluentui.bundle.js');
  // htmlWebpackPluginOptions.uifabric = path.join(__dirname, 'build', 'uifabric.bundle.js');
  // htmlWebpackPluginOptions.rc = path.join(__dirname, 'build', 'rc.bundle.js');
  // htmlWebpackPluginOptions.icon = path.join(__dirname, 'build', 'icon.bundle.js');
}

plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));

module.exports = {
  plugins
};
