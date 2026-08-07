import type { UserConfig } from "vite-plus";
import { DEFAULT_IGNORE_PATTERNS, REACT_NATIVE_IGNORE_PATTERNS } from "./constants.ts";
import {
  reviewedBaseRules,
  reviewedNodeRules,
  reviewedReactRules,
  reviewedVitestRules,
} from "./rule-policy.ts";

export const BASE_LINT_PLUGINS = ["typescript", "unicorn", "oxc", "import", "promise"] as const;

type LintConfig = NonNullable<UserConfig["lint"]>;
type LintRules = NonNullable<LintConfig["rules"]>;

const baseRules: LintRules = {
  ...reviewedBaseRules,

  complexity: ["error", { max: 20 }],
  "getter-return": "error",
  "no-alert": "error",
  "no-bitwise": "error",
  "no-console": ["error", { allow: ["info", "warn", "error"] }],
  "no-param-reassign": ["error", { props: true }],
  "no-plusplus": "error",
  "no-undef": "error",
  "no-unneeded-ternary": "error",
  "no-unreachable": "error",
  "no-useless-return": "error",
  "prefer-template": "error",

  "import/no-cycle": "error",
  "import/no-unassigned-import": "off",

  "oxc/bad-match-all-arg": "error",

  "typescript/consistent-return": "error",
  "typescript/consistent-type-exports": "error",
  "typescript/consistent-type-imports": [
    "error",
    { prefer: "type-imports", fixStyle: "separate-type-imports" },
  ],
  "typescript/dot-notation": "error",
  "typescript/explicit-module-boundary-types": "error",
  "typescript/no-confusing-void-expression": "error",
  "typescript/no-dynamic-delete": "error",
  "typescript/no-explicit-any": "error",
  "typescript/no-floating-promises": "error",
  "typescript/no-misused-promises": "error",
  "typescript/no-misused-spread": "error",
  "typescript/no-non-null-assertion": "error",
  "typescript/no-require-imports": "error",
  "typescript/no-unnecessary-condition": "error",
  "typescript/no-unnecessary-qualifier": "error",
  "typescript/no-unnecessary-type-arguments": "error",
  "typescript/no-unnecessary-type-assertion": "error",
  "typescript/no-unnecessary-type-parameters": "error",
  "typescript/no-unsafe-argument": "error",
  "typescript/no-unsafe-assignment": "error",
  "typescript/no-unsafe-call": "error",
  "typescript/no-unsafe-member-access": "error",
  "typescript/no-unsafe-return": "error",
  "typescript/no-useless-default-assignment": "error",
  "typescript/non-nullable-type-assertion-style": "error",
  "typescript/only-throw-error": "error",
  "typescript/prefer-find": "error",
  "typescript/prefer-nullish-coalescing": "error",
  "typescript/prefer-optional-chain": "error",
  "typescript/prefer-readonly": "error",
  "typescript/prefer-regexp-exec": "error",
  "typescript/require-array-sort-compare": "error",
  "typescript/restrict-plus-operands": "error",
  "typescript/restrict-template-expressions": "error",
  "typescript/return-await": "error",
  "typescript/strict-boolean-expressions": "error",
  "typescript/strict-void-return": "error",
  "typescript/switch-exhaustiveness-check": "error",
  "typescript/unbound-method": "error",
  "typescript/use-unknown-in-catch-callback-variable": "error",

  "unicorn/no-abusive-eslint-disable": "error",
};

const baseLintConfig: LintConfig = {
  plugins: [...BASE_LINT_PLUGINS],
  ignorePatterns: [...DEFAULT_IGNORE_PATTERNS],
  env: {
    serviceworker: true,
    worker: true,
  },
  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
    typeCheck: true,
  },
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  rules: baseRules,
  overrides: [
    {
      files: ["**/*.{cjs,cts}"],
      env: {
        node: true,
      },
      rules: {
        "typescript/no-require-imports": "off",
      },
    },
    {
      files: ["**/*.config.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"],
      env: {
        node: true,
      },
      rules: {
        "func-names": "off",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "typescript/no-empty-interface": "off",
      },
    },
    {
      files: [
        "**/test/**",
        "**/tests/**",
        "**/__tests__/**",
        "**/*.{test,spec}.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
      ],
      plugins: [...BASE_LINT_PLUGINS, "vitest"],
      env: {
        vitest: true,
      },
      rules: reviewedVitestRules,
    },
  ],
};

export const baseLint: LintConfig = baseLintConfig;

const reactRules: LintRules = {
  ...reviewedReactRules,

  "react/exhaustive-deps": "error",
  "react/react-compiler": "error",
  "react/react-in-jsx-scope": "off",
  "react/jsx-key": "error",
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
  "react/no-unsafe": "error",
  "react/no-unknown-property": "error",
  "react/style-prop-object": "off",
  "react/void-dom-elements-no-children": "error",
};

const reactLintConfig: LintConfig = {
  plugins: ["react", "jsx-a11y"],
  env: {
    browser: true,
  },
  rules: reactRules,
};

export const reactLint: LintConfig = reactLintConfig;

const reactNativeLintConfig: LintConfig = {
  plugins: ["react"],
  ignorePatterns: [...REACT_NATIVE_IGNORE_PATTERNS],
  env: {
    browser: false,
  },
  globals: {
    __DEV__: "readonly",
    process: "readonly",
  },
  rules: {
    ...reactRules,
    "react/no-unknown-property": "off",
    "react/no-unescaped-entities": "off",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
  },
};

export const reactNativeLint: LintConfig = reactNativeLintConfig;

const serverLintConfig: LintConfig = {
  plugins: ["node"],
  globals: {
    WebSocketPair: "readonly",
  },
  rules: reviewedNodeRules,
};

export const serverLint: LintConfig = serverLintConfig;
