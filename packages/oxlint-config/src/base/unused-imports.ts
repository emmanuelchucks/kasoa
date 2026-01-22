import type { JsPlugin, Rules } from "../types.ts";

export const unusedImportsPlugin: JsPlugin = "eslint-plugin-unused-imports";

export const unusedImportsRules: Rules = {
  "unused-imports/no-unused-imports": "error",
};
