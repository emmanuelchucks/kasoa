import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig } from "eslint/config";

const COGNITIVE_COMPLEXITY_THRESHOLD = 15;

export const sonarjsConfig = defineConfig(sonarjs.configs.recommended, {
  rules: {
    "sonarjs/cognitive-complexity": ["warn", COGNITIVE_COMPLEXITY_THRESHOLD],
    "sonarjs/deprecation": "off",
  },
});
