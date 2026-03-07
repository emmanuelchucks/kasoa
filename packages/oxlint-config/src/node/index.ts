import type { OxlintConfig } from "oxlint";
import { defineConfig } from "oxlint";
import { base } from "../base/index.ts";

export const node: OxlintConfig = defineConfig({
  ...base,
  plugins: [...(base.plugins ?? []), "node"],
  rules: {
    ...base.rules,
    "node/no-exports-assign": "error",
  },
});
