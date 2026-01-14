import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";

const unifiedCustomGroups = [
  {
    elementNamePattern: "(?:^id$|^_id$|^key$|^uuid$|Id$)",
    groupName: "id",
  },
  {
    elementNamePattern: "(?:At$|_at$)",
    groupName: "timestamp",
  },
  {
    elementNamePattern: "(?:^ref$|Ref$)",
    groupName: "ref",
  },
  {
    elementNamePattern: "^on[A-Z]",
    groupName: "callback",
  },
  {
    elementNamePattern: "(?:^style$|Style$)",
    groupName: "style",
  },
  {
    elementNamePattern: "(?:^className$|ClassName$)",
    groupName: "className",
  },
];

const unifiedGroups = [
  "id",
  "unknown",
  "multiline-member",
  "timestamp",
  "ref",
  "method",
  "callback",
  "style",
  "className",
];

const jsxGroups = [
  "id",
  "unknown",
  "multiline-prop",
  "timestamp",
  "ref",
  "shorthand-prop",
  "callback",
  "style",
  "className",
];

const baseConfig = {
  order: "asc" as const,
  type: "natural" as const,
};

export const perfectionistConfig = defineConfig({
  plugins: {
    perfectionist,
  },
  rules: {
    "perfectionist/sort-enums": ["error", baseConfig],
    "perfectionist/sort-export-attributes": ["error", baseConfig],
    "perfectionist/sort-import-attributes": ["error", baseConfig],
    "perfectionist/sort-intersection-types": ["error", baseConfig],
    "perfectionist/sort-named-exports": ["error", baseConfig],
    "perfectionist/sort-named-imports": ["error", baseConfig],
    "perfectionist/sort-switch-case": ["error", baseConfig],
    "perfectionist/sort-union-types": ["error", baseConfig],
    "perfectionist/sort-classes": [
      "error",
      {
        ...baseConfig,
        newlinesBetween: 1,
      },
    ],
    "perfectionist/sort-exports": [
      "error",
      {
        ...baseConfig,
        groups: ["type-export", "wildcard-export", "value-export"],
      },
    ],
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
    "perfectionist/sort-interfaces": [
      "error",
      {
        ...baseConfig,
        customGroups: unifiedCustomGroups,
        groups: unifiedGroups,
      },
    ],
    "perfectionist/sort-object-types": [
      "error",
      {
        ...baseConfig,
        customGroups: unifiedCustomGroups,
        groups: unifiedGroups,
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        ...baseConfig,
        customGroups: unifiedCustomGroups,
        groups: unifiedGroups,
      },
    ],
  },
});

export const perfectionistJsxConfig = defineConfig({
  plugins: {
    perfectionist,
  },
  rules: {
    "perfectionist/sort-jsx-props": [
      "error",
      {
        ...baseConfig,
        customGroups: unifiedCustomGroups,
        groups: jsxGroups,
      },
    ],
  },
});
