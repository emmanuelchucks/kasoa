import { configs } from "eslint-plugin-regexp";
import { defineConfig } from "eslint/config";

export const regexpConfig: ReturnType<typeof defineConfig> = defineConfig(
  configs["flat/recommended"],
);
