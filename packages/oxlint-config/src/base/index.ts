import type { OxlintConfig } from "../types.ts";
import { categories } from "./categories.ts";
import { eslintRules } from "./eslint.ts";
import { importPlugin, importRules } from "./import.ts";

import { pedanticRules } from "./pedantic.ts";
import { perfectionistPlugin, perfectionistRules } from "./perfectionist.ts";
import { promisePlugin, promiseRules } from "./promise.ts";
import { restrictionRules } from "./restriction.ts";
import { typescriptRules } from "./typescript.ts";
import { unicornRules } from "./unicorn.ts";
import { importLitePlugin, importLiteRules } from "./import-lite.ts";
import { unicornXPlugin, unicornXRules } from "./unicorn-x.ts";
import { unusedImportsPlugin, unusedImportsRules } from "./unused-imports.ts";
import { vitestPlugin, vitestRules } from "./vitest.ts";

export const baseConfig: OxlintConfig = {
  $schema: "./node_modules/oxlint/configuration_schema.json",
  plugins: [importPlugin, promisePlugin],
  jsPlugins: [
    perfectionistPlugin,
    vitestPlugin,
    unusedImportsPlugin,
    unicornXPlugin,
    importLitePlugin,
  ],
  categories,
  rules: {
    ...eslintRules,
    ...typescriptRules,
    ...importRules,
    ...promiseRules,
    ...unicornRules,

    ...restrictionRules,
    ...pedanticRules,
    ...perfectionistRules,
    ...vitestRules,
    ...unusedImportsRules,
    ...unicornXRules,
    ...importLiteRules,
  },
};
