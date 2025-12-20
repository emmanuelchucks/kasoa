import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import { defineConfig } from "eslint/config";

export const jsonConfig = defineConfig({
  files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
  extends: [jsonSchemaValidator.configs["flat/recommended"]],
});
