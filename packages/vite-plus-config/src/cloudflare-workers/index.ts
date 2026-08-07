import type { UserConfig } from "vite-plus";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import type { ConfigInput } from "../shared/config.ts";
import { createNodeConfig } from "../node/index.ts";
import {
  createDefinedConfig,
  createLazyPluginInputs,
  mergeConfigFragments,
} from "../shared/config.ts";
import { DEFAULT_WRANGLER_CONFIG_PATH } from "../shared/constants.ts";

type CloudflareWorkersPluginOptions = Exclude<
  NonNullable<Parameters<typeof cloudflareTest>[0]>,
  (...args: readonly never[]) => unknown
>;

export interface CloudflareWorkersConfigOptions extends Omit<
  CloudflareWorkersPluginOptions,
  "wrangler"
> {
  readonly config?: ConfigInput;
  readonly include?: readonly string[];
  readonly test?: UserConfig["test"];
  readonly wrangler?: CloudflareWorkersPluginOptions["wrangler"];
}

export function createCloudflareWorkersConfig(
  options: CloudflareWorkersConfigOptions = {},
): UserConfig {
  const { config = {}, include, test, wrangler, ...testPluginOptions } = options;
  const cloudflareTestConfig = createDefinedConfig(
    {
      plugins: createLazyPluginInputs(() => [
        cloudflareTest({
          ...testPluginOptions,
          wrangler: {
            configPath: DEFAULT_WRANGLER_CONFIG_PATH,
            ...wrangler,
          },
        }),
      ]),
    },
    include === undefined
      ? {}
      : {
          test: {
            include: [...include],
          },
        },
    {
      test,
    },
  );

  return createNodeConfig(mergeConfigFragments(cloudflareTestConfig, config));
}

export { createCloudflareWorkersConfig as createConfig };
