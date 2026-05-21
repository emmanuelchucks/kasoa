import type { UserConfig } from "vite-plus";
import { defineConfig, mergeConfig } from "vite-plus";

export function mergeConfigFragments(base: UserConfig, ...overrides: UserConfig[]): UserConfig {
  let result: UserConfig = {};
  result = mergeConfig<UserConfig, UserConfig>(result, base);

  for (const override of overrides) {
    result = mergeConfig<UserConfig, UserConfig>(result, override);
  }

  return result;
}

export function createDefinedConfig(base: UserConfig, ...overrides: UserConfig[]): UserConfig {
  return defineConfig(mergeConfigFragments(base, ...overrides));
}
