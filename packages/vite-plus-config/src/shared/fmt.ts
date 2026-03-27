import { defineConfig } from "oxfmt";
import { GENERATED_FILE_IGNORE_PATTERNS } from "./constants.ts";

export const baseFmt = defineConfig({
  ignorePatterns: [...GENERATED_FILE_IGNORE_PATTERNS],
  sortImports: {
    internalPattern: ["#", "@/"],
    newlinesBetween: false,
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
});

export const reactFmt = defineConfig({
  ...baseFmt,
  sortTailwindcss: {
    attributes: ["/.*ClassName/"],
    functions: ["tv"],
  },
});
