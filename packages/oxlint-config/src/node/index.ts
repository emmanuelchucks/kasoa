import { defineConfig } from "oxlint";
import { base } from "../base/index.js";

export const node = defineConfig({
  ...base,
  plugins: [...base.plugins, "node"],
  env: {
    node: true,
    vitest: true,
  },
  rules: {
    ...base.rules,
    "import/no-cycle": "error",
    "node/no-exports-assign": "error",
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
