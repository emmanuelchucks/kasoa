import type { UserConfig } from "vite-plus";
import { defineConfig } from "vite-plus";
import { base } from "../base/index.ts";

export const monorepo: UserConfig = defineConfig({
  ...base,
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
    enablePrePostScripts: true,
  },
});
