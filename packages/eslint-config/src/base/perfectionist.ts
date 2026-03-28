import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";

const baseConfig = {
  order: "asc" as const,
  type: "natural" as const,
};

export const perfectionistConfig: ReturnType<typeof defineConfig> = defineConfig({
  plugins: { perfectionist },
  rules: {
    "perfectionist/sort-imports": [
      "error",
      {
        ...baseConfig,
        newlinesBetween: 0,
        groups: [
          "type-import",
          ["value-builtin", "value-external"],
          "type-internal",
          "value-internal",
          ["type-parent", "type-sibling", "type-index"],
          ["value-parent", "value-sibling", "value-index"],
          "side-effect",
          "unknown",
        ],
      },
    ],
    "perfectionist/sort-named-imports": ["error", baseConfig],
    "perfectionist/sort-interfaces": ["error", baseConfig],
    "perfectionist/sort-object-types": ["error", baseConfig],
  },
});

export const perfectionistJsxConfig: ReturnType<typeof defineConfig> = defineConfig({
  plugins: { perfectionist },
  rules: {
    "perfectionist/sort-jsx-props": [
      "error",
      {
        ...baseConfig,
        customGroups: [
          { elementNamePattern: "^key$", groupName: "key" },
          { elementNamePattern: "^ref$", groupName: "ref" },
          { elementNamePattern: "^on[A-Z]", groupName: "callback" },
          {
            elementNamePattern: "(?:^className$|ClassName$)",
            groupName: "className",
          },
        ],
        groups: ["key", "ref", "unknown", "callback", "className"],
      },
    ],
  },
});
