import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export const reactHooksConfig = defineConfig({
  extends: [reactHooks.configs.flat["recommended-latest"]],
  files: ["**/*.{js,jsx,ts,tsx}"],
});
