module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  },
  ignorePatterns: ['public/', 'dist/']
}
