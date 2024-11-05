import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': pluginSimpleImportSort,
      prettier: prettierPlugin,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: ['node_modules', 'next', 'demo/build', 'package/dist'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
  },
  {
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-extra-boolean-cast': 'off',
      'arrow-parens': ['error', 'always'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^antd'], ['^@?\\w'], ['~/(.*)', '@/(.*)'], ['^[./]']],
        },
      ],
    },
  },
];
