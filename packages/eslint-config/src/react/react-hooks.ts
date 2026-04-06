import { defineConfig } from "@eslint/config-helpers";
import reactHooks from "eslint-plugin-react-hooks";

export const reactHooksConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...reactHooks.configs.flat["recommended-latest"],
  files: ["**/*.{js,jsx,ts,tsx}"],
});
