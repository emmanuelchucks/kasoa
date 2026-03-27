import { configs } from "eslint-plugin-regexp";
import { defineConfig } from "eslint/config";

export const regexpConfig = defineConfig(configs["flat/recommended"]);
