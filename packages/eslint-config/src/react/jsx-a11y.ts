import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export const jsxA11yConfig = defineConfig({
  ...jsxA11y.flatConfigs.strict,
  files: ["**/*.{js,jsx,ts,tsx}"],
});
