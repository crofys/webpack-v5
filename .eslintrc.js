module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect', // 自动读取已安装的react版本
    },
  },
  plugins: ['react'],
  // parserOptions 参考: https://cn.eslint.org/docs/user-guide/configuring
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
}
