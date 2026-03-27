import { defineConfig } from "oxfmt";

export const baseFmt = defineConfig({
  ignorePatterns: [
    "**/worker-configuration.d.ts",
    "**/drizzle/migrations.js",
    "**/drizzle/meta/*.json",
  ],
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
