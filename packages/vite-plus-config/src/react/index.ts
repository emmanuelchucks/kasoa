import type { UserConfig } from "vite-plus";
import { defineConfig } from "vite-plus";
import { base } from "../base/index.ts";
import { reactFmt } from "../shared/fmt.ts";
import { reactLint } from "../shared/lint.ts";

export const react: UserConfig = defineConfig({
  ...base,
  fmt: reactFmt,
  lint: reactLint,
});
