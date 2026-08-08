import type { LintRules } from "../types.ts";

export const nodeRules: LintRules = {
  "node/exports-style": "error",
  "node/global-require": "error",
  "node/no-exports-assign": "error",
  "node/no-mixed-requires": "error",
};
