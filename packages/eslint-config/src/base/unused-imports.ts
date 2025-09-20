import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export const unusedImportsConfig = defineConfig({
  rules: {
    "unused-imports/no-unused-vars": [
      "warn",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        args: "after-used",
        vars: "all",
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "off",
  },
  plugins: {
    "unused-imports": unusedImports,
  },
});
