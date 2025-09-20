import vitest from "@vitest/eslint-plugin";
import { defineConfig } from "eslint/config";

interface Vitest {
  configs: {
    recommended: ReturnType<typeof defineConfig>[0];
  };
}

export const vitestConfig = defineConfig({
  files: ["**/tests/**", "**/*.test.ts"],
  ...(vitest as unknown as Vitest).configs.recommended,
});
