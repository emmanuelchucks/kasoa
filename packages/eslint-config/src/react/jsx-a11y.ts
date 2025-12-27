import jsxA11y from "eslint-plugin-jsx-a11y";
import { defineConfig } from "eslint/config";

export const jsxA11yConfig = defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [jsxA11y.flatConfigs.strict],
});
