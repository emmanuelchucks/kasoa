import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export const reactRefreshConfig = defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [reactRefresh.configs.recommended],
});
