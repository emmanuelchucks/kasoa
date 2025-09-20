import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";

export const reactRefreshConfig = defineConfig(
  reactRefresh.configs.recommended,
);
