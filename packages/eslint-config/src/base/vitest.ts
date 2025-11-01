import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

export const vitestConfig = defineConfig({
  files: ["**/tests/**", "**/*.test.ts"],
  ...vitest.configs.recommended,
});
