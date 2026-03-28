import type { UserConfig } from "vite-plus";

type FmtConfig = NonNullable<UserConfig["fmt"]>;

export const base: FmtConfig = {
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
};
