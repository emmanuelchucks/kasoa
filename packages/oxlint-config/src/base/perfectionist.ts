import type { JsPluginConfig, Rules } from "../types.ts";

const baseConfig = {
  order: "asc" as const,
  type: "natural" as const,
};

export const perfectionistRules: Rules = {
  "perfectionist/sort-imports": [
    "error",
    {
      ...baseConfig,
      newlinesBetween: 0,
      groups: [
        "type-import",
        ["type-parent", "type-sibling", "type-index", "type-internal"],
        "value-builtin",
        "value-external",
        "value-internal",
        ["value-parent", "value-sibling", "value-index"],
        "value-side-effect",
        "unknown",
      ],
    },
  ],
  "perfectionist/sort-named-imports": ["error", baseConfig],
  "perfectionist/sort-interfaces": ["error", baseConfig],
  "perfectionist/sort-object-types": ["error", baseConfig],
};

export const perfectionistPlugin: JsPluginConfig = "eslint-plugin-perfectionist";
