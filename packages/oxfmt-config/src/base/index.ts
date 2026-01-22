import type { OxfmtConfig } from "../types";
import { sortImportsConfig } from "./sort-imports";

export const baseConfig: OxfmtConfig = {
  $schema: "./node_modules/oxfmt/configuration_schema.json",
  experimentalSortImports: sortImportsConfig,
};
