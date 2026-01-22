import type { JsPluginConfig, Rules } from "../types.ts";
import vitest from "@vitest/eslint-plugin";

export const vitestRules: Rules = {
  ...vitest.configs.all.rules,
  "vitest/no-hooks": "off",
  "vitest/max-expects": ["warn", { max: 10 }],
  "vitest/no-conditional-in-test": "error",
  "vitest/no-focused-tests": "error",
  "jest/no-hooks": "warn",
};

export const vitestPlugin: JsPluginConfig = {
  name: "vitest-js",
  specifier: "@vitest/eslint-plugin",
};
