import { defineConfig } from "@eslint/config-helpers";
import importLite from "eslint-plugin-import-lite";
import unusedImports from "eslint-plugin-unused-imports";

export const importLiteConfig: ReturnType<typeof defineConfig> = defineConfig(
  importLite.configs.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "import-lite/consistent-type-specifier-style": ["error", "top-level"],
      "import-lite/newline-after-import": "error",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
    },
  },
);
