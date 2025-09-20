import importLite from "eslint-plugin-import-lite";
import { defineConfig } from "eslint/config";

export const importLiteConfig = defineConfig(
  importLite.configs.recommended as never,
  {
    rules: {
      "import-lite/consistent-type-specifier-style": ["error", "top-level"],
      "import-lite/newline-after-import": "error",
    },
  },
);
