import type { Rules } from "../types.ts";

const baseConfig = {
  order: "asc" as const,
  type: "natural" as const,
};

export const perfectionistJsxRules: Rules = {
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
};
