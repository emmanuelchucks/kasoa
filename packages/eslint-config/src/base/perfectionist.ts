import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";

export const perfectionistConfig = defineConfig({
  plugins: {
    perfectionist,
  },
  rules: {
    "perfectionist/sort-exports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-imports": [
      "error",
      {
        groups: [
          "type",
          ["parent-type", "sibling-type", "index-type", "internal-type"],
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "side-effect",
          "object",
          "unknown",
        ],
        newlinesBetween: 0,
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-named-exports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
    "perfectionist/sort-named-imports": [
      "error",
      {
        order: "asc",
        type: "natural",
      },
    ],
  },
});
