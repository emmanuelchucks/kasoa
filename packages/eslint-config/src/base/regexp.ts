import { defineConfig } from "@eslint/config-helpers";
import { configs } from "eslint-plugin-regexp";

export const regexpConfig: ReturnType<typeof defineConfig> = defineConfig(
  configs["flat/recommended"],
);
