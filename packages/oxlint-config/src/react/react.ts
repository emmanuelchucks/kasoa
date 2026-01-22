import type { Rules } from "../types.ts";

// Native OXLint react rules (preferred over @eslint-react JS plugin for performance)
export const reactRules: Rules = {
  "react/require-render-return": "error",
  // Native equivalents to @eslint-react rules
  "react/button-has-type": "warn", // @eslint-react/dom/no-missing-button-type
  "react/iframe-missing-sandbox": "warn", // @eslint-react/dom/no-missing-iframe-sandbox
  "react/jsx-key": "error", // @eslint-react/no-missing-key
  "react/jsx-no-script-url": "warn", // @eslint-react/dom/no-script-url
  "react/jsx-no-target-blank": "warn", // @eslint-react/dom/no-unsafe-target-blank
  "react/jsx-no-useless-fragment": "warn", // @eslint-react/no-useless-fragment
  "react/no-children-prop": "error", // @eslint-react/no-children-prop
  "react/no-danger": "warn", // @eslint-react/dom/no-dangerously-set-innerhtml
  "react/no-danger-with-children": "error", // @eslint-react/dom/no-dangerously-set-innerhtml-with-children
  "react/no-direct-mutation-state": "error", // @eslint-react/no-direct-mutation-state
  "react/no-find-dom-node": "error", // @eslint-react/dom/no-find-dom-node
  "react/no-namespace": "error", // @eslint-react/dom/no-namespace
  "react/no-redundant-should-component-update": "error", // @eslint-react/no-redundant-should-component-update
  "react/no-render-return-value": "error", // @eslint-react/dom/no-render-return-value
  "react/no-string-refs": "error", // @eslint-react/no-string-refs
  "react/void-dom-elements-no-children": "error", // @eslint-react/dom/no-void-elements-with-children
};

export const reactPlugin = "react";
