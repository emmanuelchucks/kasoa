import type { UserConfig } from "vite-plus";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";
import { serverLint } from "../shared/lint.ts";

const serverConfig: UserConfig = {
  lint: serverLint,
};

export function createServerConfig(overrides: UserConfig = {}): UserConfig {
  return createDefinedConfig(createBaseConfig(), serverConfig, overrides);
}

export { createServerConfig as createConfig };
