import type { UserConfig } from "vite-plus";
import { defineConfig } from "vite-plus";
import { base } from "../base/index.ts";

export const library: UserConfig = defineConfig({
  ...base,
  pack: {
    dts: true,
    format: ["esm"],
    sourcemap: true,
  },
});
