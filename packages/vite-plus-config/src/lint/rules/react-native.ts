import type { LintRules } from "../types.ts";

export const reactNativeRules: LintRules = {
  "react/iframe-missing-sandbox": "off",
  "react/jsx-no-script-url": "off",
  "react/no-unknown-property": "off",
  "react/no-unescaped-entities": "off",
  "react/no-unstable-nested-components": [
    "error",
    {
      allowAsProps: true,
    },
  ],
  "react/void-dom-elements-no-children": "off",
};
