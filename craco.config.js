const path = require('path');
const { whenProd } = require('@craco/craco');
// const CracoEsbuildPlugin = require('craco-esbuild');
const WebpackBar = require('webpackbar');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();
const cracoAlias = require('craco-alias');

const sassResourcesLoader = require('craco-sass-resources-loader');
// eslint-disable-next-line import/no-extraneous-dependencies
const genericNames = require('generic-names');

const webpackCustom = require('./webpack.config');
// eslint-disable-line import/no-extraneous-dependencies
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';
const generate = genericNames(CSS_MODULE_LOCAL_IDENT_NAME, {
  context: process.cwd()
});
const generateScopedName = (localName, filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  return generate(localName, relativePath);
};

// const DllReferencePlugin = require('webpack/lib/DllReferencePlugin'); // eslint-disable-line import/no-extraneous-dependencies
// const DllReferencePluginArray = [];
// const dllPath = path.join(process.cwd(), `/public/dll`);
// const dllFiles = require('./webpack/dll/webpack.dll.config').entry;
// Object.keys(dllFiles).forEach(file => {
//   DllReferencePluginArray.push({
//     plugin: new DllReferencePlugin({
//       context: dllPath,
//       manifest: require(`./public/dll/${file}_manifest.json`),
//     }),
//   });
// });

const babelOptions = {
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  loaderOptions: {
    // Without this Babel caches module name resolution,
    // e.g. wrongly identifies that CSS module does not exist.
    cacheDirectory: false
  },
  plugins: [
    [
      'babel-plugin-react-css-modules',
      {
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss'
          }
        },
        exclude: 'node_modules',
        generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
        handleMissingStyleName: 'warn',
        autoResolveMultipleImports: true,
        webpackHotModuleReloading: true
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
};

// const threadLoader = require('thread-loader');
// const resolve = pathname => path.resolve(__dirname, pathname);
// const workerPool = {
//   workerParallelJobs: 50,
//   poolTimeout: 2000,
// };
// threadLoader.warmup(workerPool, ['babel-loader']);

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.extend.json'
      }
    },
    {
      plugin: sassResourcesLoader,
      options: {
        resources: ['./src/styles/colors.scss']
      }
    }
    // {
    //   plugin: {
    //     overrideDevServerConfig: ({
    //       devServerConfig
    //       // cracoConfig,
    //       // pluginOptions,
    //       // context: { env, paths, proxy, allowedHost },
    //     }) => {
    //       // yarn server
    //       let newDevServerConfig = { ...devServerConfig };
    //       if (process.env.REACT_APP_LOGIN !== '0') {
    //         // eslint-disable-next-line global-require
    //         const {
    //           port,
    //           host,
    //           key,
    //           cert,
    //           getBeforeHook,
    //           getAfterHook
    //         } = require('./webpack/server');
    //         newDevServerConfig = {
    //           ...devServerConfig,
    //           port,
    //           host,
    //           before: getBeforeHook(devServerConfig.contentBasePublicPath), // Add middleware before webpack-dev-server built-in middleware will be added.
    //           after: getAfterHook(devServerConfig.contentBasePublicPath), // Add middleware after webpack-dev-server built-in middleware has been added.
    //           https: { key, cert }
    //         };
    //       }

    //       return newDevServerConfig;
    //     },
    //     overrideWebpackConfig: ({
    //       webpackConfig,
    //       cracoConfig, // eslint-disable-line @typescript-eslint/no-unused-vars
    //       pluginOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
    //       context: { env }
    //     }) => {
    //       // yarn mock
    //       if (env === 'development') {
    //         const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
    //           ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
    //         );
    //         webpackConfig.resolve.plugins[scopePluginIndex].appSrcs.push(path.resolve('./mock'));
    //       }
    //       return webpackConfig;
    //     }
    //   }
    // }
    // {
    //   plugin: CracoEsbuildPlugin,
    // },
    // ...pluginArray,
  ],
  babel: babelOptions,
  style: {
    modules: {
      localIdentName: CSS_MODULE_LOCAL_IDENT_NAME
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets')
      }
    },
    css: {
      loaderOptions: {
        modules: {
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getLocalIdent: (context, localIdentName, localName, options) =>
            generateScopedName(localName, context.resourcePath)
        }
      }
    },
    sass: {
      // loaderOptions: {
      //   /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
      //   prependData: Object.keys(styleVariables)
      //     .map(k => `\$${k}: ${styleVariables[k]};`)
      //     // .concat([`\$STATIC_URL: '${process.env.STATIC_URL || ""}';`])
      //     .join('\n'),
      // },
      loaderOptions: sassLoaderOptions => sassLoaderOptions
    }
  },
  eslint: {
    enable: true /* (default value) */,
    // mode: 'file' /* (default value) */,
    // configure: { /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */ },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, global-require
    configure: (eslintConfig, { env, paths }) => require('./.eslintrc.js')
    // pluginOptions: {
    //   /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
    //   cache: false,
    //   threads: false,
    // },
    // pluginOptions: (eslintOptions, { env, paths }) => { return eslintOptions; }
  },
  webpack: {
    alias: {},
    plugins: {
      /* An array of plugins */
      add: [
        smp,
        // ...webpackCustom.plugins,
        new WebpackBar({ color: 'green', profile: true }),
        ...whenProd(
          () => [
            new TerserPlugin({
              parallel: true,
              extractComments: false,
              terserOptions: {
                output: {
                  comments: false
                },
                compress: {
                  drop_debugger: true,
                  drop_console: true
                }
              }
            }),
            new HardSourceWebpackPlugin(),
            new BundleAnalyzerPlugin({
              analyzerMode: 'disable',
              generateStatsFile: true
            })
          ],
          []
        )
      ],
      remove:
        [] /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    },
    configure: (webpackConfig, { paths }) => {
      /* Any webpack configuration options: https://webpack.js.org/configuration */
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          ...webpackConfig.optimization.splitChunks,
          ...{
            chunks: 'all', // initial、async和all
            minSize: 30 * 1024,
            maxSize: 512 * 1024,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true
          }
        }
      };
      // webpackConfig.module = {
      //   ...webpackConfig.module,
      //   rules: [
      //     ...webpackConfig.module.rules,
      //     {
      //       test: /\.(tsx?|ts?|js?)$/,
      //       include: [resolve('./src')],
      //       use: [
      //         {
      //           loader: 'thread-loader',
      //           options: workerPool,
      //         },
      //         'cache-loader',
      //         'babel-loader?cacheDirectory',
      //         // {
      //         //   loader: 'babel-loader?cacheDirectory',
      //         //   options: {
      //         //     presets: babelOptions.presets,
      //         //     plugins: babelOptions.plugins,
      //         //   },
      //         // },
      //       ],
      //     },
      //   ],
      // };
      return webpackConfig;
    }
  }
};
