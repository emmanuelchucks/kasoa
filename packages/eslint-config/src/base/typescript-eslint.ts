import type { Linter } from "eslint";
import { defineConfig } from "eslint/config";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

const sharedConfig = {
  extends: [
    typescriptEslint.configs.strictTypeChecked,
    typescriptEslint.configs.stylisticTypeChecked,
  ],
  parserOptions: {
    projectService: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/method-signature-style": ["error", "property"],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "no-shadow": "off",
    "@typescript-eslint/consistent-type-exports": [
      "error",
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
  } satisfies Linter.RulesRecord,
};

export const typescriptEslintConfig = defineConfig(
  {
    extends: sharedConfig.extends,
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts}"],
    rules: sharedConfig.rules,
    languageOptions: {
      parserOptions: sharedConfig.parserOptions,
    },
  },
  {
    extends: sharedConfig.extends,
    files: ["**/*.{cjs,cts}"],
    languageOptions: {
      parserOptions: sharedConfig.parserOptions,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...sharedConfig.rules,
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
