import type { LintRules } from "../types.ts";
import { universalRestrictedProperties } from "./universal.ts";

export const reactNativeRules: LintRules = {
  "no-restricted-properties": [
    "error",
    ...universalRestrictedProperties,
    {
      property: "toSorted",
      message: "Hermes lacks toSorted; copy the array before sorting.",
    },
    {
      object: "Intl",
      property: "RelativeTimeFormat",
      message: "Hermes lacks Intl.RelativeTimeFormat; use a supported formatter.",
    },
  ],
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
  "unicorn/no-array-reverse": "error",
  "unicorn/no-array-sort": [
    "error",
    {
      allowAfterSpread: true,
    },
  ],
};
