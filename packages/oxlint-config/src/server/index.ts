import type { OxlintConfig } from "oxlint";
import { defineConfig } from "oxlint";
import { base } from "../base/index.ts";

export const server: OxlintConfig = defineConfig({
  ...base,
  plugins: [...(base.plugins ?? []), "node"],
  globals: {
    ...base.globals,
    WebSocketPair: "readonly",
  },
  rules: {
    ...base.rules,
    "node/no-exports-assign": "error",
  },
});
