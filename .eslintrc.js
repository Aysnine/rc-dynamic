module.exports = {
  extends: ['react-app', 'react-app/jest'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  ignorePatterns: ['public/', 'dist/'],
}
