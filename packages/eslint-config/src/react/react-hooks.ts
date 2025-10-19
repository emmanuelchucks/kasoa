import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export const reactHooksConfig = defineConfig(
  reactHooks.configs.flat["recommended-latest"] as never,
);
