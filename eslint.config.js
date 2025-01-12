import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.node },
    extends: [
      'eslint:recommended',
      'plugin:prettier/recommended', // Añade Prettier a ESLint
    ],
  },
  pluginJs.configs.recommended,
];
