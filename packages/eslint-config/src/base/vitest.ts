import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

export const vitestConfig = defineConfig({
  files: ["**/tests/**", "**/*.test.ts", "**/*.test.tsx"],
  extends: [vitest.configs.all],
});
