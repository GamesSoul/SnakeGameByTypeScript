export default {
  env: {
    es6: true,
    browser: true
  },
  parserOptions: {
    sourceType: "module"
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}