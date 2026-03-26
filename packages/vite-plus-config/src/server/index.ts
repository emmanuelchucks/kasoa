import type { UserConfig } from "vite-plus";
import { defineConfig } from "vite-plus";
import { base } from "../base/index.ts";
import { serverLint } from "../shared/lint.ts";

export const server: UserConfig = defineConfig({
  ...base,
  lint: serverLint,
});
