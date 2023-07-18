module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
    'unused-imports',
    'prettier',
  ],
  extends: [
    'plugin:react/recommended',
    // 'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['*.js'], // ignore files outside src
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: 'true',
    '@typescript-eslint/semi': ['error'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'type', 'const'],
      },
    ],
    'react/no-unstable-nested-components': 'warn',
    // Sort imports
    'import/order': [
      'warn',
      {
        pathGroups: [{ pattern: '@*', group: 'internal' }],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'never',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'sort-imports': ['warn', { ignoreCase: true, ignoreDeclarationSort: true }],
    // Format imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/no-duplicates': 'warn',
    'import/no-useless-path-segments': 'warn',
    // Rules regarding minimize code complexity
    'no-param-reassign': ['error'],
    'max-lines': ['error', { max: 2000, skipBlankLines: true }],
    complexity: ['error', { max: 10 }],
    'max-nested-callbacks': ['error', { max: 2 }],
    'max-depth': ['error', { max: 3 }],
    'max-params': ['error', { max: 3 }],
    'react-hooks/exhaustive-deps': 'off',
    'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true }],
  },
  overrides: [
    {
      files: ['use*.ts'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: ['**.test.{ts,tsx}', '**.test.{js,jsx}'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'max-nested-callbacks': 'off',
        'max-depth': 'off',
        'max-params': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'unused-imports/no-unused-imports-ts': 'error',
      },
    },
  ],
};
