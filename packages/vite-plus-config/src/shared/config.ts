import type { UserConfig } from "vite-plus";
import { defineConfig, mergeConfig } from "vite-plus";

export function mergeConfigFragments(base: UserConfig, ...overrides: UserConfig[]): UserConfig {
  return overrides.reduce<UserConfig>((result, override) => mergeConfig(result, override), base);
}

export function createDefinedConfig(base: UserConfig, ...overrides: UserConfig[]): UserConfig {
  return defineConfig(mergeConfigFragments(base, ...overrides));
}
