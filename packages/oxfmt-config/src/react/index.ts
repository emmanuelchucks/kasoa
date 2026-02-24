import { base } from "../base/index.ts";

export const react = {
  ...base,
  sortTailwindcss: {
    attributes: ["/.*ClassName/"],
    functions: ["tv"],
  },
};
