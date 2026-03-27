import type { UserConfig } from "vite-plus";
import { GENERATED_FILE_IGNORE_PATTERNS } from "./constants.ts";

type FmtConfig = NonNullable<UserConfig["fmt"]>;

export const baseFmt = {
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
} satisfies FmtConfig;

export const reactFmt = {
  ...baseFmt,
  sortTailwindcss: {
    attributes: ["/.*ClassName/"],
    functions: ["tv"],
  },
} satisfies FmtConfig;
