import type { SortImportsConfig } from "../types";

export const sortImportsConfig: SortImportsConfig = {
  internalPattern: ["#", "#/**"],
  newlinesBetween: false,
  groups: [
    "type",
    ["type-parent", "type-sibling", "type-index", "type-internal"],
    "builtin",
    "external",
    "internal",
    ["parent", "sibling", "index"],
    "side-effect",
    "unknown",
  ],
};
