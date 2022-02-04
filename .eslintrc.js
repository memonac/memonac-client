module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "eslint-config-prettier",
    "plugin:react/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-var": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
