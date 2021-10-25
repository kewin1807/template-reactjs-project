// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'prettier',
    // 'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript'
    // 'plugin:markdown/recommended',
  ],
  parserOptions: {
    project: './tsconfig.extend.json'
  },
  env: {
    browser: true,
    node: true,
    // jasmine: true,
    // jest: true,
    es6: true
  },
  settings: {
    react: {
      version: '16.13.1'
    },
    // 'import/resolver': {
    //   node: {
    //     extensions: ['.ts', '.tsx', '.js', '.jsx'],
    //   },
    // },
    'import/resolver': {
      typescript: {}
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'babel',
    // 'jest',
    '@typescript-eslint',
    'react-hooks',
    'unicorn',
    'simple-import-sort'
    // 'markdown'
  ],
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 0,
        'no-debugger': 0,
        '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 1,
        '@typescript-eslint/no-explicit-any': [1],
        '@typescript-eslint/no-unused-vars-experimental': [
          1,
          { ignoreArgsIfArgsAfterAreUsed: true }
        ]
      }
    }
    // TODO: I'll uncomment it after we have jest case & own UI scaffolding
    // {
    //   // In v2, configuration for fenced code blocks is separate from the
    //   // containing Markdown file. Each code block has a virtual filename
    //   // appended to the Markdown file's path.
    //   files: [
    //     'components/*/demo/*.md/*.ts',
    //     'components/*/demo/*.md/*.tsx',
    //     'components/*/demo/*.md/*.js',
    //     'components/*/demo/*.md/*.jsx',
    //   ],
    //   // Configuration for fenced code blocks goes with the override for
    //   // the code block's virtual filename, for example:
    //   parserOptions: {
    //     ecmaFeatures: {
    //       impliedStrict: true,
    //     },
    //   },
    //   globals: {
    //     React: true,
    //     ReactDOM: true,
    //     mountNode: true,
    //   },
    //   rules: {
    //     indent: 0,
    //     'no-console': 0,
    //     'no-plusplus': 0,
    //     'eol-last': 0,
    //     'no-script-url': 0,
    //     'default-case': 0,
    //     'prefer-rest-params': 0,
    //     'react/no-access-state-in-setstate': 0,
    //     'react/destructuring-assignment': 0,
    //     'react/no-multi-comp': 0,
    //     'react/no-array-index-key': 0,
    //     'jsx-a11y/href-no-hash': 0,
    //     'import/no-extraneous-dependencies': 0,
    //     'jsx-a11y/control-has-associated-label': 0,
    //   },
    // },
  ],
  rules: {
    'react/jsx-one-expression-per-line': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/jsx-filename-extension': 0,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0, // TODO: remove later
    'react/require-default-props': 0,
    'react/sort-comp': 0,
    'react/display-name': 0,
    'react/static-property-placement': 0,
    'react/no-find-dom-node': 0,
    'react/no-unused-prop-types': 0,
    'react/default-props-match-prop-types': 0,
    'react-hooks/rules-of-hooks': 2, // Checks rules of Hooks

    'simple-import-sort/imports': [
      1,
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
          ],
          // Packages. `react` related packages come first.
          ['^react', '^(@fluentui|@uifabric)', '^@?\\w'],
          // Internal packages.
          [
            '^(@layouts|@component|@utils|@redux|@API|@locales|@routes|@pages|components|utils|config|vendored-lib)(/.*|$)',
            '^(@styles|@assets)(/.*|$)'
          ],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$']
        ]
      }
    ],
    'simple-import-sort/exports': 1,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'site/**',
          'tests/**',
          'scripts/**',
          '**/*.test.js',
          '**/__tests__/*',
          '*.config.js',
          '**/*.md'
        ]
      }
    ],
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    // label-has-for has been deprecated
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
    'jsx-a11y/label-has-for': 0,

    'comma-dangle': [
      'warn',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'consistent-return': 0, // TODO: remove later
    'no-param-reassign': 0, // TODO: remove later
    'no-underscore-dangle': 0,
    // for (let i = 0; i < len; i++)
    'no-plusplus': 0,
    // https://eslint.org/docs/rules/no-continue
    // labeledLoop is conflicted with `eslint . --fix`
    'no-continue': 0,
    // ban this for Number.isNaN needs polyfill
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,

    // 'jest/no-test-callback': 0,
    // 'jest/expect-expect': 0,
    // 'jest/no-done-callback': 0,
    // 'jest/valid-title': 0,
    // 'jest/no-conditional-expect': 0,

    'unicorn/better-regex': 2,
    'unicorn/prefer-string-trim-start-end': 2,
    'unicorn/expiring-todo-comments': 2,
    'unicorn/no-abusive-eslint-disable': 2,

    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    // 'no-use-before-define': 0,
    // '@typescript-eslint/no-use-before-define': 2,
    // note you must disable the base rule as it can report incorrect errors
    // 'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],
    // 'no-shadow': 0,
    // '@typescript-eslint/no-shadow': [2, { ignoreTypeValueShadow: true }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/2528#issuecomment-689369395
    'no-undef': 0
  },
  globals: {
    gtag: true
  }
};
