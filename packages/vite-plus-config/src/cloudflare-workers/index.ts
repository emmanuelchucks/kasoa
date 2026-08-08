import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { lazyPlugins } from "vite-plus";
import type { ConfigFragment } from "../compose.ts";
import { DEFAULT_WRANGLER_CONFIG_PATH } from "../constants.ts";

type LazyPluginInput = object | readonly object[] | false | null | undefined;

type CloudflareTestOptions = Exclude<
  NonNullable<Parameters<typeof cloudflareTest>[0]>,
  (...args: readonly never[]) => unknown
>;

export interface CloudflareTestConfigOptions extends Omit<CloudflareTestOptions, "wrangler"> {
  readonly wrangler?: CloudflareTestOptions["wrangler"];
}

function createLazyPluginInputs(
  factory: () => readonly LazyPluginInput[],
): ConfigFragment["plugins"] {
  // eslint-disable-next-line typescript/no-unsafe-type-assertion -- Vite 8 plugin types recurse beyond TypeScript's comparison limit; lazyPlugins returns the named Vite plugins represented by this shallow boundary.
  return lazyPlugins(factory as never) as ConfigFragment["plugins"];
}

export function createCloudflareTestConfig(
  options: CloudflareTestConfigOptions = {},
): ConfigFragment {
  const { wrangler, ...pluginOptions } = options;

  return {
    plugins: createLazyPluginInputs(() => [
      cloudflareTest({
        ...pluginOptions,
        wrangler: {
          configPath: DEFAULT_WRANGLER_CONFIG_PATH,
          ...wrangler,
        },
      }),
    ]),
  };
}
