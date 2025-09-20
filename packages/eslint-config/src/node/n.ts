import nodePlugin from "eslint-plugin-n";
import { defineConfig } from "eslint/config";

export const nodeConfig = defineConfig(
  nodePlugin.configs["flat/recommended-module"],
);
