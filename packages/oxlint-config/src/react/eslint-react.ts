import type { JsPluginConfig, Rules } from "../types.ts";

export const eslintReactPlugin: JsPluginConfig = "@eslint-react/eslint-plugin";

// Core @eslint-react rules that OXLint JS plugins can handle
// NOTE: Sub-plugin rules (dom/, web-api/, hooks-extra/, naming-convention/)
// are NOT supported by OXLint's JS plugin system
export const eslintReactRules: Rules = {
  "@eslint-react/jsx-key-before-spread": "warn",
  "@eslint-react/jsx-no-comment-textnodes": "warn",
  "@eslint-react/jsx-no-duplicate-props": "error",
  "@eslint-react/jsx-no-iife": "error",
  "@eslint-react/jsx-no-undef": "error",
  "@eslint-react/no-access-state-in-setstate": "error",
  "@eslint-react/no-array-index-key": "warn",
  "@eslint-react/no-children-count": "warn",
  "@eslint-react/no-children-for-each": "warn",
  "@eslint-react/no-children-map": "warn",
  "@eslint-react/no-children-only": "warn",
  "@eslint-react/no-children-to-array": "warn",
  "@eslint-react/no-class-component": "error",
  "@eslint-react/no-clone-element": "warn",
  "@eslint-react/no-component-will-mount": "error",
  "@eslint-react/no-component-will-receive-props": "error",
  "@eslint-react/no-component-will-update": "error",
  "@eslint-react/no-context-provider": "warn",
  "@eslint-react/no-create-ref": "error",
  "@eslint-react/no-default-props": "error",
  "@eslint-react/no-forward-ref": "warn",
  "@eslint-react/no-implicit-key": "warn",
  "@eslint-react/no-leaked-conditional-rendering": "error",
  "@eslint-react/no-misused-capture-owner-stack": "error",
  "@eslint-react/no-nested-component-definitions": "error",
  "@eslint-react/no-nested-lazy-component-declarations": "error",
  "@eslint-react/no-prop-types": "error",
  "@eslint-react/no-set-state-in-component-did-mount": "warn",
  "@eslint-react/no-set-state-in-component-did-update": "warn",
  "@eslint-react/no-set-state-in-component-will-update": "warn",
  "@eslint-react/no-unnecessary-use-callback": "warn",
  "@eslint-react/no-unnecessary-use-memo": "warn",
  "@eslint-react/no-unnecessary-use-prefix": "warn",
  "@eslint-react/no-unsafe-component-will-mount": "warn",
  "@eslint-react/no-unsafe-component-will-receive-props": "warn",
  "@eslint-react/no-unsafe-component-will-update": "warn",
  "@eslint-react/no-unstable-default-props": "warn",
  "@eslint-react/no-unused-class-component-members": "warn",
  "@eslint-react/no-unused-props": "warn",
  "@eslint-react/no-unused-state": "warn",
  "@eslint-react/no-use-context": "warn",
  "@eslint-react/no-useless-forward-ref": "warn",
  "@eslint-react/prefer-destructuring-assignment": "warn",
  "@eslint-react/prefer-use-state-lazy-initialization": "warn",
};

// Rules excluded - have native OXLint equivalents (in react.ts):
// - @eslint-react/no-missing-key -> react/jsx-key
// - @eslint-react/no-useless-fragment -> react/jsx-no-useless-fragment
// - @eslint-react/no-string-refs -> react/no-string-refs
// - @eslint-react/no-children-prop -> react/no-children-prop
// - @eslint-react/no-direct-mutation-state -> react/no-direct-mutation-state
// - @eslint-react/no-redundant-should-component-update -> react/no-redundant-should-component-update

// Rules NOT supported by OXLint JS plugins (sub-plugin structure):
// - @eslint-react/dom/* (17 rules) - use native react/ equivalents where possible
// - @eslint-react/web-api/* (4 rules)
// - @eslint-react/hooks-extra/* (1 rule)
// - @eslint-react/naming-convention/* (3 rules)
