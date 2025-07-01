// eslint.config.js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const prettier = require("eslint-plugin-prettier");

module.exports = defineConfig([
  expoConfig,
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error", // Show Prettier formatting issues as errors
    },
    ignores: ["dist/*"],
  },
]);
