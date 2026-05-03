import type { UserConfig } from "vite-plus";
import { createBaseConfig } from "../base/index.ts";
import { createDefinedConfig } from "../shared/config.ts";

const monorepoConfig: UserConfig = {
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
    enablePrePostScripts: true,
  },
};

export function createMonorepoConfig<const Overrides extends UserConfig = UserConfig>(
  overrides?: Overrides,
): UserConfig & Pick<Overrides, never> {
  return createDefinedConfig(createBaseConfig(), monorepoConfig, overrides ?? {});
}

export { createMonorepoConfig as createConfig };
