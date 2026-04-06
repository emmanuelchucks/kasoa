import { defineConfig } from "@eslint/config-helpers";
import nodePlugin from "eslint-plugin-n";

export const nodeConfig: ReturnType<typeof defineConfig> = defineConfig(
  nodePlugin.configs["flat/recommended-module"],
  {
    rules: {
      "n/no-missing-import": "off",
      "n/no-unpublished-import": "off",
    },
  },
);
