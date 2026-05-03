import type { UserConfig } from "vite-plus";
import { defineConfig, mergeConfig } from "vite-plus";

type ConfigResult<Config> = UserConfig & Pick<Config, never>;

export function mergeConfigFragments<
  const Base extends UserConfig,
  const Overrides extends readonly UserConfig[],
>(base: Base, ...overrides: Overrides): ConfigResult<Base & Overrides[number]> {
  let result: UserConfig = {};
  result = mergeConfig<UserConfig, UserConfig>(result, base);

  for (const override of overrides) {
    result = mergeConfig<UserConfig, UserConfig>(result, override);
  }

  return result;
}

export function createDefinedConfig<
  const Base extends UserConfig,
  const Overrides extends readonly UserConfig[],
>(base: Base, ...overrides: Overrides): ConfigResult<Base & Overrides[number]> {
  return defineConfig(mergeConfigFragments(base, ...overrides));
}
