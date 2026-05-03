import type { UserConfig } from "vite-plus";
import { createDefinedConfig } from "../shared/config.ts";
import {
  DEFAULT_STAGED_CHECK_COMMAND,
  DEFAULT_STAGED_CHECK_GLOB,
  DEFAULT_TEST_INCLUDE,
} from "../shared/constants.ts";
import { baseFmt } from "../shared/fmt.ts";
import { baseLint } from "../shared/lint.ts";

const baseConfig: UserConfig = {
  fmt: baseFmt,
  lint: baseLint,
  test: {
    include: [...DEFAULT_TEST_INCLUDE],
  },
  staged: {
    [DEFAULT_STAGED_CHECK_GLOB]: DEFAULT_STAGED_CHECK_COMMAND,
  },
};

export function createBaseConfig<const Overrides extends UserConfig = UserConfig>(
  overrides?: Overrides,
): UserConfig & Pick<Overrides, never> {
  return createDefinedConfig(baseConfig, overrides ?? {});
}

export { createBaseConfig as createConfig };
