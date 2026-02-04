import gitignore from "eslint-config-flat-gitignore";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import { eslintConfig } from "./eslint.js";
import { importLiteConfig } from "./import-lite.js";
import { perfectionistConfig } from "./perfectionist.js";
import { regexpConfig } from "./regexp.js";
import { sonarjsConfig } from "./sonarjs.js";
import { typescriptEslintConfig } from "./typescript-eslint.js";
import { unicornXConfig } from "./unicorn-x.js";
import { unusedImportsConfig } from "./unused-imports.js";
import { vitestConfig } from "./vitest.js";

export const base = defineConfig(
  gitignore(),
  globalIgnores(["**/*.d.ts"]),
  eslintConfig,
  typescriptEslintConfig,

  unicornXConfig,
  vitestConfig,
  importLiteConfig,
  unusedImportsConfig,
  perfectionistConfig,
  sonarjsConfig,
  regexpConfig,
  eslintConfigPrettier,
);
