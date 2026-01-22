import type { JsPlugin, Rules } from "../types.ts";

export const importLitePlugin: JsPlugin = "eslint-plugin-import-lite";

export const importLiteRules: Rules = {
  "import-lite/no-duplicates": "error",
  "import-lite/newline-after-import": "error",
  "import-lite/consistent-type-specifier-style": ["error", "top-level"],
};
