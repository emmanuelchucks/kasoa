import gitignore from "eslint-config-flat-gitignore";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig, globalIgnores } from "eslint/config";
import { eslintConfig } from "./eslint.ts";
import { importLiteConfig } from "./import-lite.ts";
import { perfectionistConfig } from "./perfectionist.ts";
import { regexpConfig } from "./regexp.ts";
import { sonarjsConfig } from "./sonarjs.ts";
import { typescriptEslintConfig } from "./typescript-eslint.ts";
import { unicornXConfig } from "./unicorn-x.ts";
import { unusedImportsConfig } from "./unused-imports.ts";

export const base = defineConfig(
  gitignore(),
  globalIgnores(["**/*.d.ts"]),
  eslintConfig,
  typescriptEslintConfig,

  unicornXConfig,
  importLiteConfig,
  unusedImportsConfig,
  perfectionistConfig,
  sonarjsConfig,
  regexpConfig,
  eslintConfigPrettier,
);
