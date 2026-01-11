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
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/no-magic-numbers": [
      "warn",
      {
        ignore: [-1, 0, 1, 2],
        ignoreArrayIndexes: true,
        ignoreDefaultValues: true,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreTypeIndexes: true,
      },
    ],
  } satisfies Linter.RulesRecord,
};

export const typescriptEslintConfig = defineConfig(
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts}"],
    extends: sharedConfig.extends,
    languageOptions: {
      parserOptions: sharedConfig.parserOptions,
    },
    rules: sharedConfig.rules,
  },
  {
    files: ["**/*.{cjs,cts}"],
    extends: sharedConfig.extends,
    languageOptions: {
      sourceType: "commonjs",
      parserOptions: sharedConfig.parserOptions,
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
