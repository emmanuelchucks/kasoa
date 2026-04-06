import { defineConfig } from "@eslint/config-helpers";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

export const reactRefreshConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...reactRefreshPlugin.configs.recommended,
  files: ["**/*.{js,jsx,ts,tsx}"],
});
