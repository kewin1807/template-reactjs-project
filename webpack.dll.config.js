// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const path = require('path');

const DLLEntry = {
  react: ['react', 'react-dom'],
  redux: ['redux', 'react-redux', 'redux-saga', 'react-router-dom'],
  fluentui: ['@fluentui/react', '@fluentui/react-hooks'],
  uifabric: ['@uifabric/file-type-icons', '@uifabric/react-hooks', '@uifabric/styling'],
  rc: ['react-intl'],
  vendor: ['classnames', 'dangerously-set-html-content', 'lodash', 'query-string'],
  icon: [
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/free-solid-svg-icons',
    '@fortawesome/react-fontawesome'
  ]
};
module.exports = {
  mode: 'development',
  target: 'web',
  entry: DLLEntry,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    pathinfo: true,
    path: path.join(__dirname, 'build'),
    library: '[name]_library'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.DllPlugin({
      name: '[name]_library',
      path: path.join(__dirname, 'build', '[name]-manifest.json'),
      context: path.resolve(__dirname, 'src')
    })
  ]
};
