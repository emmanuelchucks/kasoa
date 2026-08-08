import type { LintRules } from "../types.ts";

export const reactDomRules: LintRules = {
  "react/checked-requires-onchange-or-readonly": "error",
  "react/jsx-no-target-blank": "error",
  "react/no-unescaped-entities": "error",
  "react/no-danger": "error",
  "react/no-danger-with-children": "error",
  "react/no-find-dom-node": "error",
  "react/no-unknown-property": "error",
  "react/void-dom-elements-no-children": "error",
};
