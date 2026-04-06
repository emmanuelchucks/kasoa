import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import gitignore from "eslint-config-flat-gitignore";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { eslintConfig } from "./eslint.ts";
import { importLiteConfig } from "./import-lite.ts";
import { perfectionistConfig } from "./perfectionist.ts";
import { regexpConfig } from "./regexp.ts";
import { sonarjsConfig } from "./sonarjs.ts";
import { typescriptEslintConfig } from "./typescript-eslint.ts";
import { unicornXConfig } from "./unicorn-x.ts";

export const base: ReturnType<typeof defineConfig> = defineConfig(
  gitignore(),
  globalIgnores(["**/*.d.ts"]),
  eslintConfig,
  typescriptEslintConfig,
  unicornXConfig,
  importLiteConfig,
  perfectionistConfig,
  sonarjsConfig,
  regexpConfig,
  eslintConfigPrettier,
);
