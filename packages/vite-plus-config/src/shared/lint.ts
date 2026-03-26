import type { OxlintConfig } from "oxlint";

export const BASE_LINT_PLUGINS = ["typescript", "unicorn", "oxc", "import", "promise"] as const;

const baseLintConfig: OxlintConfig = {
  plugins: [...BASE_LINT_PLUGINS],
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
    pedantic: "error",
    perf: "error",
    style: "error",
  },
  rules: {
    "capitalized-comments": "off",
    "func-style": "off",
    "id-length": "off",
    "init-declarations": "off",
    "max-classes-per-file": "off",
    "max-lines-per-function": "off",
    "max-statements": "off",
    "no-continue": "off",
    "no-magic-numbers": "off",
    "no-ternary": "off",
    "require-await": "off",
    "sort-imports": "off",
    "sort-keys": "off",
    "vars-on-top": "off",

    complexity: ["error", { max: 10 }],
    curly: ["error", "multi-line", "consistent"],
    "default-case-last": "error",
    eqeqeq: "error",
    "getter-return": "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "max-depth": ["error", { max: 3 }],
    "max-nested-callbacks": ["error", { max: 3 }],
    "max-params": ["error", { max: 3 }],
    "new-cap": "off",
    "no-alert": "error",
    "no-bitwise": "error",
    "no-console": ["error", { allow: ["info", "warn", "error"] }],
    "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
    "no-param-reassign": ["error", { props: true }],
    "no-plusplus": "error",
    "no-undef": "error",
    "no-unneeded-ternary": "error",
    "no-unreachable": "error",
    "no-useless-return": "error",
    "prefer-template": "error",

    "import/exports-last": "off",
    "import/group-exports": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-named-export": "off",
    "import/no-namespace": "off",
    "import/no-nodejs-modules": "off",
    "import/no-unassigned-import": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "error",

    "promise/prefer-await-to-callbacks": "off",

    "typescript/ban-ts-comment": ["error", { minimumDescriptionLength: 10 }],
    "typescript/consistent-type-definitions": "off",
    "typescript/consistent-return": "error",
    "typescript/consistent-type-exports": "error",
    "typescript/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "typescript/dot-notation": "error",
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
    "typescript/require-await": "off",
    "typescript/require-array-sort-compare": "error",
    "typescript/restrict-plus-operands": "error",
    "typescript/restrict-template-expressions": "error",
    "typescript/return-await": "error",
    "typescript/strict-boolean-expressions": "error",
    "typescript/strict-void-return": "error",
    "typescript/switch-exhaustiveness-check": "error",
    "typescript/unbound-method": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",

    "unicorn/no-null": "off",
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
  },
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
      rules: {
        "vitest/no-importing-vitest-globals": "off",
        "vitest/max-nested-describe": ["error", { max: 3 }],
      },
    },
  ],
};

export const baseLint: OxlintConfig = baseLintConfig;

const reactLintConfig: OxlintConfig = {
  ...baseLint,
  plugins: [...(baseLint.plugins ?? []), "react", "react-perf", "jsx-a11y"],
  rules: {
    ...baseLint.rules,
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
};

export const reactLint: OxlintConfig = reactLintConfig;

const serverLintConfig: OxlintConfig = {
  ...baseLint,
  plugins: [...(baseLint.plugins ?? []), "node"],
  globals: {
    ...baseLint.globals,
    WebSocketPair: "readonly",
  },
  rules: {
    ...baseLint.rules,
    "node/no-exports-assign": "error",
  },
};

export const serverLint: OxlintConfig = serverLintConfig;
