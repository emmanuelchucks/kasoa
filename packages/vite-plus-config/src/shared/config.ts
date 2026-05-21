import type { UserConfig } from "vite-plus";
import { defineConfig, mergeConfig } from "vite-plus";

export type PluginInput = object | readonly object[] | false | null | undefined;

export type ConfigInput = Omit<UserConfig, "plugins"> & {
  /**
   * Vite plugins to merge into the config.
   *
   * This is intentionally typed structurally instead of as Vite's recursive
   * PluginOption type. Vite 8 plugin types from different Vite entrypoints can
   * trigger excessive stack-depth comparisons before the config reaches Vite.
   */
  readonly plugins?: readonly PluginInput[];
};

function toUserConfig(config: ConfigInput): UserConfig {
  // eslint-disable-next-line typescript/no-unsafe-type-assertion -- ConfigInput preserves UserConfig autocomplete but keeps plugin assignability shallow at our public boundary.
  return config as UserConfig;
}

export function mergeConfigFragments(base: ConfigInput, ...overrides: ConfigInput[]): UserConfig {
  let result: UserConfig = {};
  result = mergeConfig<UserConfig, UserConfig>(result, toUserConfig(base));

  for (const override of overrides) {
    result = mergeConfig<UserConfig, UserConfig>(result, toUserConfig(override));
  }

  return result;
}

export function createDefinedConfig(base: ConfigInput, ...overrides: ConfigInput[]): UserConfig {
  return defineConfig(mergeConfigFragments(base, ...overrides));
}
