import jsonSchemaValidator from "eslint-plugin-json-schema-validator";
import { defineConfig } from "eslint/config";

export const jsonConfig = defineConfig(
  ...jsonSchemaValidator.configs["flat/recommended"],
);
