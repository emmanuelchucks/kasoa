import type { UserConfig } from "vite-plus";
import {
  CLOUDFLARE_WORKER_IGNORE_PATTERNS,
  DEFAULT_IGNORE_PATTERNS,
  REACT_NATIVE_IGNORE_PATTERNS,
} from "./constants.ts";

type FormatConfig = NonNullable<UserConfig["fmt"]>;

export const baseFormatConfig: FormatConfig = {
  ignorePatterns: [...DEFAULT_IGNORE_PATTERNS],
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

export const reactFormatConfig: FormatConfig = {
  sortTailwindcss: {
    attributes: ["/.*ClassName/"],
    functions: ["tv"],
  },
};

export const reactNativeFormatConfig: FormatConfig = {
  ignorePatterns: [...REACT_NATIVE_IGNORE_PATTERNS],
};

export const cloudflareWorkerFormatConfig: FormatConfig = {
  ignorePatterns: [...CLOUDFLARE_WORKER_IGNORE_PATTERNS],
};
