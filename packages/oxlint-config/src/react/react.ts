import type { Rules } from "../types.ts";

export const reactRules: Rules = {
  "react/require-render-return": "error",
  "react/no-redundant-should-component-update": "error",
};

export const reactPlugin = "react";
