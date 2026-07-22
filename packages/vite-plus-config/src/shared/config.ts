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

function mergeConfigFragment(current: UserConfig, fragment: ConfigInput): UserConfig {
  const merged = toUserConfig(mergeConfig<UserConfig, UserConfig>(current, toUserConfig(fragment)));
  // Vite concatenates nested arrays, but an Oxlint rule tuple is one atomic value.
  const rules = fragment.lint?.rules;

  if (rules === undefined) {
    return merged;
  }

  return {
    ...merged,
    lint: {
      ...merged.lint,
      rules: {
        ...current.lint?.rules,
        ...rules,
      },
    },
  };
}

export function mergeConfigFragments(base: ConfigInput, ...overrides: ConfigInput[]): UserConfig {
  let result = mergeConfigFragment({}, base);

  for (const override of overrides) {
    result = mergeConfigFragment(result, override);
  }

  return result;
}

export function createDefinedConfig(base: ConfigInput, ...overrides: ConfigInput[]): UserConfig {
  return defineConfig(mergeConfigFragments(base, ...overrides));
}
