import { defineConfig } from "eslint/config";
import { node } from "./src/node/index.js";

export default defineConfig(node, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      projectService: true,
    },
  },
});
