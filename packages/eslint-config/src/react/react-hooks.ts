import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export const reactHooksConfig = defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [reactHooks.configs.flat["recommended-latest"]],
});
