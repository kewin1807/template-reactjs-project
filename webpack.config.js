const {
  DllReferencePlugin
  // eslint-disable-next-line import/no-extraneous-dependencies
} = require('webpack');

// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

// const genericNames = require('generic-names');

const { interpolateName } = require('loader-utils');

function genericNames(pattern) {
  const context = process.cwd();
  return function generate(localName, filepath) {
    const name = pattern.replace(/\[local\]/gi, localName);
    const loaderContext = {
      resourcePath: filepath,
    };

    const loaderOptions = {
      content: `${path.relative(context, filepath).replace(/\\/g, '/')}\u0000${localName}`,
      context,
    };

    const genericName = interpolateName(loaderContext, name, loaderOptions);
    return genericName
      .replace(new RegExp('[^a-zA-Z0-9\\-_\u00A0-\uFFFF]', 'g'), '-')
      .replace(/^((-?[0-9])|--)/, '_$1');
  };
}

// const { getLocalIdent } = require('babel-plugin-react-css-modules/utils');


const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';
const generate = genericNames(CSS_MODULE_LOCAL_IDENT_NAME);
const generateScopedName = (localName, filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  return generate(localName, relativePath);
};
const WebpackBar = require('webpackbar');

const isDevelopment = !(process.env.NODE_ENV === 'production');
// eslint-disable-next-line no-nested-ternary
const devtool = isDevelopment
  ? process.env.USE_SOURCE_MAP
    ? 'eval-cheap-source-map'
    : 'eval'
  : undefined;

const output = {
  path: path.resolve(__dirname, 'dist'),
  filename: isDevelopment ? '[name].js' : '[name].[contenthash:8].js',
  publicPath: '/'
};
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
        scope: './src'
      })
    );
  });
  htmlWebpackPluginOptions.vendor = path.join(__dirname, 'build', 'vendor.bundle.js');
  htmlWebpackPluginOptions.react = path.join(__dirname, 'build', 'react.bundle.js');
  htmlWebpackPluginOptions.redux = path.join(__dirname, 'build', 'redux.bundle.js');
  htmlWebpackPluginOptions.fluentui = path.join(__dirname, 'build', 'fluentui.bundle.js');
  htmlWebpackPluginOptions.uifabric = path.join(__dirname, 'build', 'uifabric.bundle.js');
  htmlWebpackPluginOptions.rc = path.join(__dirname, 'build', 'rc.bundle.js');
  htmlWebpackPluginOptions.icon = path.join(__dirname, 'build', 'icon.bundle.js');
}

plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));
plugins.push(new WebpackBar({ color: 'green', profile: true }));
const optimizer = {};

if (process.env.NODE_ENV === 'production') {
  optimizer.minimize = true;
  optimizer.minimizer = [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ];
  // eslint-disable-next-line no-sequences
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  optimizer.runtimeChunk = false;
  optimizer.splitChunks = {
    cacheGroups: {
      default: false
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (env, conf) => ({
  stats: {
    preset: 'minimal'
  },
  experiments: {
    cacheUnaffected: true,
    lazyCompilation: {
      entries: false,
      imports: isDevelopment && process.env.DISABLED_LAZY !== 'true'
    }
  },
  cache: {
    type: 'memory',
    cacheUnaffected: true
  },
  watchOptions: {
    aggregateTimeout: 100, // immediately
    ignored: ['node_modules', 'dist', 'build']
  },
  devtool,
  mode: process.env.NODE_ENV || 'development',
  // devServer: {
  //   hot: true,
  //   liveReload: false,
  //   https: false,
  //   historyApiFallback: true,
  //   static: [path.resolve(__dirname, 'public'), path.resolve(__dirname, 'build')],
  //   // for ngrok tunneling
  //   allowedHosts: 'all'
  // },
  resolve: {
    alias: {
      // '@API/types': ['src/api/types.ts'],
      '@API': path.resolve(__dirname, 'src/api/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@pages': path.resolve(__dirname, 'src/pages/index.ts'),
      '@locales': path.resolve(__dirname, 'src/locales/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@redux': path.resolve(__dirname, 'src/redux/')
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss']
  },

  entry: ['./src/index.tsx'],
  output,
  plugins: [
    ...plugins,
    new ESLintPlugin({
      fix: true,
      cache: true,
      quiet: true,
      lintDirtyModulesOnly: true,
      // eslintPath: "./eslintrc.js",
      extensions: ['ts', 'tsx', 'js', 'jsx']
    })
  ],
  optimization: optimizer,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
              // sourceMap: true,
              // importLoaders: 1,
              // esModule: false,
              modules: {
                // compileType: 'module',
                mode: resourcePath => {
                  // if (/fabric.min.css$/i.test(resourcePath)) {
                  //   return "global";
                  // }
                  // ((c|sa|sc)ss)
                  if (/.module.scss$/i.test(resourcePath)) {
                    return 'local';
                  }
                  return 'global';
                },
                auto: true,
                namedExport: false,
                // localIdentName: '[local]___[hash:base64:5]',
                getLocalIdent: (context, localIdentName, localName, options) =>
                  generateScopedName(localName, context.resourcePath)
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              additionalData: `@import 'src/styles/colors.scss';`,
              implementation: require('node-sass')
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './src/assets/images/',
              // development need proxy
              publicPath: './src/assets/images/'
            }
          }
        ]
      },
      {
        test: /\.(webm|mov)$/i,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200000,
              encoding: 'base64'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              ref: true,
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // loader: 'tsx',
          // target: 'es2020',
          // minify: false,
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
          plugins: [
            [
              'babel-plugin-react-css-modules',
              {
                filetypes: {
                  '.scss': {
                    syntax: 'postcss-scss'
                  }
                },
                webpackHotModuleReloading: true,
                autoResolveMultipleImports: true,
                exclude: 'node_modules',
                generateScopedName: genericNames(CSS_MODULE_LOCAL_IDENT_NAME),
                handleMissingStyleName: 'warn'
              }
            ],
            [
              'module-resolver',
              {
                root: ['./'],
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
                alias: {
                  '@styles': './src/styles'
                }
              }
            ]
          ]
        }
      },
      {
        test: /\.xml$/,
        exclude: /node_modules/,
        loader: 'url-loader'
      }
    ]
  }
});
