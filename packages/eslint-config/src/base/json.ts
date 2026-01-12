import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import { defineConfig } from "eslint/config";

export const jsonConfig = defineConfig({
  extends: [jsonSchemaValidator.configs["flat/recommended"]],
  files: ["**/*.json", "**/*.jsonc", "**/*.json5"],
});
