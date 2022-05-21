module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier', 'next'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['next/babel'],
    },
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: ['plugin:react/recommended', 'airbnb-typescript', 'prettier', 'next'],
      plugins: ['react', '@typescript-eslint', 'unused-imports'],
      rules: {
        '@next/next/no-img-element': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'unused-imports/no-unused-imports-ts': 'error',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'external',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
};
