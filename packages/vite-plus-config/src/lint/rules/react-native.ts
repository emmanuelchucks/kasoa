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
    {
      object: "Intl",
      property: "PluralRules",
      message: "Hermes lacks Intl.PluralRules; choose plural forms explicitly.",
    },
    {
      object: "Intl",
      property: "ListFormat",
      message: "Hermes lacks Intl.ListFormat; join lists explicitly.",
    },
    {
      object: "Intl",
      property: "Segmenter",
      message: "Hermes lacks Intl.Segmenter; split text explicitly.",
    },
    {
      object: "Intl",
      property: "DisplayNames",
      message: "Hermes lacks Intl.DisplayNames; map codes to names explicitly.",
    },
    {
      object: "Array",
      property: "fromAsync",
      message: "Hermes lacks Array.fromAsync; collect async values in a loop.",
    },
    {
      object: "RegExp",
      property: "escape",
      message: "Hermes lacks RegExp.escape; escape patterns explicitly.",
    },
  ],
  "no-restricted-globals": [
    "error",
    { name: "Temporal", message: "Hermes lacks Temporal; use Date." },
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
