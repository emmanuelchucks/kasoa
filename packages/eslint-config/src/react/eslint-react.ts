import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";

export const eslintReactConfig = defineConfig({
  ...eslintReact.configs["strict-type-checked"],
  files: ["**/*.{js,jsx,ts,tsx}"],
  rules: {
    ...eslintReact.configs["strict-type-checked"].rules,
    "@eslint-react/no-unstable-context-value": "off",
    "@eslint-react/prefer-namespace-import": "error",
  },
});
