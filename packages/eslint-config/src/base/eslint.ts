import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

export const eslintConfig = defineConfig(eslint.configs.recommended, {
  rules: {
    eqeqeq: "error",
    "object-shorthand": "error",
  },
});
