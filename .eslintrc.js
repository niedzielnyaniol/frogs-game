module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
  },
};
