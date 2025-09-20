// @ts-expect-error - eslint-plugin-jsx-a11y-x is not typed
import jsxA11yX from "eslint-plugin-jsx-a11y-x";
import { defineConfig } from "eslint/config";

interface JSXA11y {
  flatConfigs: {
    strict: ReturnType<typeof defineConfig>[0];
  };
}

export const jsxA11yXConfig = defineConfig(
  (jsxA11yX as JSXA11y).flatConfigs.strict,
);
