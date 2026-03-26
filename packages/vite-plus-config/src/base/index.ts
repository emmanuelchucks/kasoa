import type { UserConfig } from "vite-plus";
import { defineConfig } from "vite-plus";
import {
  DEFAULT_STAGED_CHECK_COMMAND,
  DEFAULT_STAGED_CHECK_GLOB,
  DEFAULT_TEST_INCLUDE,
} from "../shared/constants.ts";
import { baseFmt } from "../shared/fmt.ts";
import { baseLint } from "../shared/lint.ts";

export const base: UserConfig = defineConfig({
  fmt: baseFmt,
  lint: baseLint,
  test: {
    include: [...DEFAULT_TEST_INCLUDE],
  },
  staged: {
    [DEFAULT_STAGED_CHECK_GLOB]: DEFAULT_STAGED_CHECK_COMMAND,
  },
});
