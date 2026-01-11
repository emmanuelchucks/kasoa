import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

export const eslintConfig = defineConfig(eslint.configs.recommended, {
  rules: {
    eqeqeq: "error",
    curly: ["error", "multi-line", "consistent"],
    "object-shorthand": "error",
    "max-params": "warn",
    "max-lines-per-function": "warn",
    complexity: "warn",
  },
});
