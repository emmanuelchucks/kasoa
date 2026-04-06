import type { UserConfig } from "vite-plus";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { createDefinedConfig } from "../../shared/config.ts";
import { DEFAULT_TEST_INCLUDE, DEFAULT_WRANGLER_CONFIG_PATH } from "../../shared/constants.ts";

type CloudflareWorkersPluginOptions = Exclude<
  NonNullable<Parameters<typeof cloudflareTest>[0]>,
  (...args: never[]) => unknown
>;

export interface CloudflareWorkersTestConfigOptions extends Omit<
  CloudflareWorkersPluginOptions,
  "wrangler"
> {
  include?: string[];
  test?: UserConfig["test"];
  wrangler?: CloudflareWorkersPluginOptions["wrangler"];
}

export function createCloudflareWorkersTestConfig(
  options: CloudflareWorkersTestConfigOptions = {},
): UserConfig {
  const { include = [...DEFAULT_TEST_INCLUDE], test, wrangler, ...pluginOptions } = options;

  return createDefinedConfig(
    {
      plugins: [
        cloudflareTest({
          ...pluginOptions,
          wrangler: {
            configPath: DEFAULT_WRANGLER_CONFIG_PATH,
            ...wrangler,
          },
        }),
      ],
      test: {
        include,
      },
    },
    {
      test,
    },
  );
}

export { createCloudflareWorkersTestConfig as createConfig };
