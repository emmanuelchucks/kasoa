import { defineConfig } from "@eslint/config-helpers";
import jsxA11y from "eslint-plugin-jsx-a11y";

export const jsxA11yConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...jsxA11y.flatConfigs.strict,
  files: ["**/*.{js,jsx,ts,tsx}"],
});
