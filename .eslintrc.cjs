/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {},
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": [0],
        "@typescript-eslint/no-explicit-any": [0],
        "@typescript-eslint/no-empty-function": [0],
        "@typescript-eslint/no-empty-interface": [0],
        "@typescript-eslint/no-var-requires": [0],
        "@typescript-eslint/ban-types": [0],
        "vue/multi-word-component-names": 0,
      },
    },
  ],
};
