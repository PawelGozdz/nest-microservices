module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // errors
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'import/no-default-export': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        name: 'src/*',
        message: 'Importing from src is not allowed.',
      },
      {
        name: 'apps/*',
        message: 'Importing from apps is not allowed.',
      },
      {
        name: '@app/*/*',
        message: 'Importing from @app/*/* is not allowed.',
      },
      {
        name: '@users/*/*',
        message: 'Importing from @users/*/* is not allowed.',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{e2e-spec,spec}.{js,ts}',
          '**/webpack.config.js',
          '**/webpack.config.*.js',
          '**/setup-tests.ts',
          '**/*.fixture.ts',
          '**/seeds/*.ts',
        ],
        optionalDependencies: false,
      },
    ],
    'import/order': [
      'error',
      {
        'groups': [['builtin', 'external']],
        'newlines-between': 'never',
        'alphabetize': { order: 'asc' },
      },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],

    // warnings
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { ignoreRestSiblings: true, argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // disabled
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'max-classes-per-file': 'off',
    '@typescript-eslint/unbound-method': 'off',
    'arrow-body-style': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-void': 'off',
  },
  overrides: [
    {
      files: ['**/src/services/**/infrastructure/models/**/*.ts'],
      rules: {
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['**/*.{spec,e2e-spec}.ts'],
      rules: {
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
      },
    },
    {
      files: ['**/src/cli/**/*.ts'],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
