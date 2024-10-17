import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.jest,
        Log: 'readonly',
      }
    },
    plugins: {
      '@stylistic': stylisticJs
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', {
        ignoreStrings: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      }],
      '@stylistic/quotes': ['error', 'single', {
        avoidEscape: true,
      }],

      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    }
  },
];
