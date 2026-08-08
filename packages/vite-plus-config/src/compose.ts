import type { UserConfig } from "vite-plus";
import { defineConfig, mergeConfig } from "vite-plus";

interface NamedPlugin {
  readonly name: string;
}

type PluginValue = NamedPlugin | false | null | undefined;

export type PluginInput = PluginValue | readonly PluginValue[];

export type ConfigFragment = Omit<UserConfig, "plugins"> & {
  readonly plugins?: readonly PluginInput[];
};

function toUserConfig(config: ConfigFragment): UserConfig {
  // eslint-disable-next-line typescript/no-unsafe-type-assertion -- Vite's recursive PluginOption overflows TypeScript 7 when consumers pass an ordinary Plugin; ConfigFragment preserves the named-plugin boundary without recursive comparison.
  return config as UserConfig;
}

export function composeConfig(...fragments: readonly ConfigFragment[]): UserConfig {
  let config: UserConfig = {};

  for (const fragment of fragments) {
    config = mergeConfig(config, toUserConfig(fragment));
  }

  return defineConfig(config);
}
