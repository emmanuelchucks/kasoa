import unicornX from "eslint-plugin-unicorn-x";
import { defineConfig } from "eslint/config";

export const unicornXConfig = defineConfig(unicornX.configs.recommended, {
  rules: {
    "unicorn-x/better-regex": "error",
    "unicorn-x/prefer-import-meta-properties": "error",
    "unicorn-x/prevent-abbreviations": "off",
  },
});
