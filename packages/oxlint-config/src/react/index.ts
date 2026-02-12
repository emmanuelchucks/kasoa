import { defineConfig } from "oxlint";
import { base } from "../base/index.js";

export const react = defineConfig({
  ...base,
  plugins: [...base.plugins, "react", "jsx-a11y"],
  env: {
    vitest: true,
  },
  rules: {
    ...base.rules,
    "import/no-cycle": "error",
    "react/jsx-key": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-unknown-property": "error",
    "jsx-a11y/alt-text": "error",
    "vitest/no-focused-tests": "error",
    "vitest/no-disabled-tests": "error",
    "vitest/no-standalone-expect": "error",
  },
  overrides: [
    {
      files: ["**/tests/**", "**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      rules: {
        "vitest/max-nested-describe": ["warn", { max: 3 }],
      },
    },
  ],
});
