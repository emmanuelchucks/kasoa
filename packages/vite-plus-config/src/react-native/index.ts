import type { UserConfig } from "vite-plus";
import type { ConfigInput } from "../shared/config.ts";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";
import { reactNativeFmt } from "../shared/fmt.ts";
import { reactNativeLint } from "../shared/lint.ts";

const reactNativeConfig: UserConfig = {
  fmt: reactNativeFmt,
  lint: reactNativeLint,
};

export function createReactNativeConfig(overrides: ConfigInput = {}): UserConfig {
  return createDefinedConfig(createBaseConfig(), reactNativeConfig, overrides);
}

export { createReactNativeConfig as createConfig };
