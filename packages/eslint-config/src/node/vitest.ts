import { defineConfig } from "@eslint/config-helpers";
import vitest from "@vitest/eslint-plugin";

export const vitestConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...vitest.configs.recommended,
  files: ["**/tests/**", "**/*.test.ts", "**/*.test.tsx"],
});
