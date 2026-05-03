import type { UserConfig } from "vite-plus";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";
import { reactFmt } from "../shared/fmt.ts";
import { reactLint } from "../shared/lint.ts";

const reactConfig: UserConfig = {
  fmt: reactFmt,
  lint: reactLint,
};

export function createReactConfig<const Overrides extends UserConfig = UserConfig>(
  overrides?: Overrides,
): UserConfig & Pick<Overrides, never> {
  return createDefinedConfig(createBaseConfig(), reactConfig, overrides ?? {});
}

export { createReactConfig as createConfig };
