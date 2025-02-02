module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020, // Use modern ECMAScript features
      sourceType: 'module'
    },
    env: {
      node: true, // Enable Node.js global variables and scoping
      es6: true
    },
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      // Add custom rules or override defaults here:
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
      'constructor-super': 'off'
    }
  };