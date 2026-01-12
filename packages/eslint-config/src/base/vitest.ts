import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

export const vitestConfig = defineConfig({
  extends: [vitest.configs.all],
  files: ["**/tests/**", "**/*.test.ts", "**/*.test.tsx"],
});
