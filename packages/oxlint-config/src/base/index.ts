import { defineConfig } from "oxlint";

export const base = defineConfig({
  plugins: ["typescript", "unicorn", "oxc", "import", "vitest"],
  rules: {
    "default-case-last": "error",
    eqeqeq: "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "max-params": "warn",
    "no-alert": "error",
    "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    "no-constructor-return": "error",
    "no-else-return": ["error", { allowElseIf: false }],
    "no-param-reassign": ["error", { props: false }],
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "prefer-template": "error",

    "typescript/ban-ts-comment": ["error", { minimumDescriptionLength: 10 }],
    "typescript/consistent-type-imports": "error",
    "typescript/no-explicit-any": "warn",
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
    "typescript/no-unsafe-assignment": "warn",
    "typescript/no-unsafe-call": "warn",
    "typescript/no-unsafe-member-access": "warn",
    "typescript/no-unsafe-return": "warn",
    "typescript/no-require-imports": "off",
    "typescript/require-array-sort-compare": "error",
    "typescript/switch-exhaustiveness-check": "error",
    "typescript/await-thenable": "error",

    "getter-return": "error",
    "no-undef": "error",
    "no-unreachable": "error",
    "typescript/prefer-optional-chain": "warn",
  },
});
