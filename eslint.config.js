// ESLint configuration <https://eslint.org/docs/user-guide/configuring>

'use strict';

const { default: nodejs } = require('@kevinoid/eslint-config/nodejs.js');
const globals = require('globals');

function disableGlobalsFromConfigs(configs) {
  const globalNames = configs.flatMap((config) => {
    const confGlobals = config.languageOptions?.globals;
    return confGlobals ? Object.keys(confGlobals) : [];
  });
  return globalNames.reduce((disabled, globalName) => {
    disabled[globalName] = 'off';
    return disabled;
  }, {});
}

module.exports = [
  {
    ignores: [
      'coverage/',
      'doc/',
    ],
  },

  ...nodejs,

  {
    rules: {
      // Allow requiring devDependencies for build and test
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          ...nodejs
            .findLast(
              (conf) => conf.rules?.['import/no-extraneous-dependencies'],
            )
            .rules['import/no-extraneous-dependencies'][1].devDependencies,
          'gulpfile.js',
          'test-bin/**',
          'test-lib/**',
          'test/**',
        ],
      }],

      // Allow CommonJS modules
      'unicorn/prefer-module': 'off',

      // Don't prefer top-level await
      // Since top-level await is only supported in ECMAScript Modules (ESM)
      'unicorn/prefer-top-level-await': 'off',
    },
  },

  {
    name: 'mocha plugin config',
    files: [
      'index.js',
    ],
    languageOptions: {
      // Code may run in any environment and must test globals before use.
      // Unfortunately, there is no easy way to disable globals:
      // https://github.com/eslint/eslint/discussions/17193
      globals: {
        ...disableGlobalsFromConfigs(nodejs),
        ...globals.builtin,
      },
    },
  },

  {
    name: 'test config',
    basePath: 'test',
    languageOptions: {
      globals: globals.mocha,
    },
    rules: {
      // Allow, but don't require, braces around function body
      // Braces around body of it() function is more consistent/readable
      'arrow-body-style': 'off',

      // Allow null use in tests
      'unicorn/no-null': 'off',

      // Allow EventEmitter use in tests
      'unicorn/prefer-event-target': 'off',
    },
  },
];
