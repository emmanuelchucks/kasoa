import { defineConfig } from "eslint/config";
import typescriptEslint from "typescript-eslint";

export const typescriptEslintConfig = defineConfig(
  typescriptEslint.configs.strictTypeChecked,
  typescriptEslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
);
