import type { OxlintConfig } from "../types.ts";
import { nodePlugin } from "./node.ts";

export const nodeConfig: OxlintConfig = {
  $schema: "./node_modules/oxlint/configuration_schema.json",
  extends: ["./base.json"],
  plugins: [nodePlugin],
};
