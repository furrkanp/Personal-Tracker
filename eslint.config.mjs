import eslintConfigExpo from 'eslint-config-expo/flat';

export default [
  ...eslintConfigExpo,
  { ignores: ['node_modules/**', '.expo/**', 'coverage/**'] },
];
