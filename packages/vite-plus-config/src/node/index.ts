import type { UserConfig } from "vite-plus";
import type { ConfigInput } from "../shared/config.ts";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";
import { serverLint } from "../shared/lint.ts";

const nodeConfig: UserConfig = {
  lint: serverLint,
};

export function createNodeConfig(overrides: ConfigInput = {}): UserConfig {
  return createDefinedConfig(createBaseConfig(), nodeConfig, overrides);
}

export { createNodeConfig as createConfig };
