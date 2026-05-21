import type { UserConfig } from "vite-plus";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";

const libraryConfig: UserConfig = {
  pack: {
    clean: true,
    dts: true,
    format: ["esm"],
    sourcemap: true,
  },
};

export function createLibraryConfig(overrides: UserConfig = {}): UserConfig {
  return createDefinedConfig(createBaseConfig(), libraryConfig, overrides);
}

export { createLibraryConfig as createConfig };
