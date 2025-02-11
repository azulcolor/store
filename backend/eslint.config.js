import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', 
    ],
  },
  pluginJs.configs.recommended,
];
