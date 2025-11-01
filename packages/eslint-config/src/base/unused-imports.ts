import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig } from "eslint/config";

export const unusedImportsConfig = defineConfig({
  plugins: {
    "unused-imports": unusedImports,
  },
  rules: {
    "unused-imports/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-unused-vars": "off",
  },
});
