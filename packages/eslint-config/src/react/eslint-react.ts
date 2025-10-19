import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "eslint/config";

export const eslintReactConfig = defineConfig(
  eslintReact.configs["recommended-type-checked"],
  {
    rules: {
      "@eslint-react/prefer-namespace-import": "error",
    },
  },
);
