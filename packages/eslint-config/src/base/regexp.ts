import * as regexpPlugin from "eslint-plugin-regexp";
import { defineConfig } from "eslint/config";

export const regexpConfig = defineConfig(
  regexpPlugin.configs["flat/recommended"],
);
