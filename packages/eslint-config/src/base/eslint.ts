import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";

export const eslintConfig = defineConfig(eslint.configs.recommended, {
  rules: {
    curly: ["error", "multi-line", "consistent"],
    "default-case-last": "error",
    eqeqeq: "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "logical-assignment-operators": ["error", "always"],
    "max-lines-per-function": "warn",
    "max-params": "warn",
    "no-alert": "error",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-constructor-return": "error",
    "no-else-return": ["error", { allowElseIf: false }],
    "no-param-reassign": ["error", { props: false }],
    "no-shadow": "off",
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
  },
});
