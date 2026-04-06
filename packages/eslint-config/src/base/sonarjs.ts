import { defineConfig } from "@eslint/config-helpers";
import sonarjs from "eslint-plugin-sonarjs";

const COGNITIVE_COMPLEXITY_THRESHOLD = 15;

export const sonarjsConfig: ReturnType<typeof defineConfig> = defineConfig({
  plugins: { sonarjs },
  rules: {
    "sonarjs/cognitive-complexity": ["warn", COGNITIVE_COMPLEXITY_THRESHOLD],
    "sonarjs/no-identical-expressions": "error",
    "sonarjs/no-identical-conditions": "error",
    "sonarjs/no-duplicated-branches": "error",
    "sonarjs/no-nested-conditional": "error",
    "sonarjs/no-gratuitous-expressions": "error",
    "sonarjs/no-invariant-returns": "error",
    "sonarjs/no-alphabetical-sort": "error",
    "sonarjs/different-types-comparison": "error",
    "sonarjs/no-nested-functions": "error",
    "sonarjs/assertions-in-tests": "error",
    "sonarjs/no-incomplete-assertions": "error",
    "sonarjs/no-skipped-tests": "error",
    "sonarjs/no-hardcoded-passwords": "error",
    "sonarjs/no-hardcoded-ip": "error",
  },
});
