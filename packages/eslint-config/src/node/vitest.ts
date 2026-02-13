import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

export const vitestConfig = defineConfig({
  ...vitest.configs.recommended,
  files: ["**/tests/**", "**/*.test.ts", "**/*.test.tsx"],
});
