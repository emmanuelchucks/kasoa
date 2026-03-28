import reactRefreshPlugin from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export const reactRefreshConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...reactRefreshPlugin.configs.recommended,
  files: ["**/*.{js,jsx,ts,tsx}"],
});
