import type { OxlintConfig } from "oxlint";
import { defineConfig } from "oxlint";
import { base } from "../base/index.ts";

export const react: OxlintConfig = defineConfig({
  ...base,
  plugins: [...(base.plugins ?? []), "react", "react-perf", "jsx-a11y"],
  rules: {
    ...base.rules,
    "jsx-a11y/alt-text": "error",

    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/exhaustive-deps": "error",
    "react/jsx-key": "error",
    "react/jsx-max-depth": ["error", { max: 4 }],
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-undef": "error",
    "react/no-array-index-key": "error",
    "react/no-children-prop": "error",
    "react/no-clone-element": "error",
    "react/no-danger": "error",
    "react/no-danger-with-children": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-find-dom-node": "error",
    "react/no-react-children": "error",
    "react/no-string-refs": "error",
    "react/style-prop-object": "off",
    "react/no-unsafe": "error",
    "react/no-unknown-property": "error",
    "react/void-dom-elements-no-children": "error",

    "react-perf/jsx-no-jsx-as-prop": "error",
    "react-perf/jsx-no-new-array-as-prop": "error",
    "react-perf/jsx-no-new-function-as-prop": "error",
    "react-perf/jsx-no-new-object-as-prop": "error",
  },
});
