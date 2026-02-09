import unicornX from "eslint-plugin-unicorn-x";
import { defineConfig } from "eslint/config";

export const unicornXConfig = defineConfig(unicornX.configs.recommended, {
  rules: {
    "unicorn-x/prefer-import-meta-properties": "error",
    "unicorn-x/prevent-abbreviations": "off",
    "unicorn-x/no-array-for-each": "error",
  },
});
