import type { UserConfig } from "vite-plus";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { defineConfig } from "vite-plus";
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
  wrangler?: CloudflareWorkersPluginOptions["wrangler"];
}

export function createCloudflareWorkersTestConfig(
  options: CloudflareWorkersTestConfigOptions = {},
): UserConfig {
  const { include = [...DEFAULT_TEST_INCLUDE], wrangler, ...pluginOptions } = options;

  return defineConfig({
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
  });
}

export const cloudflareWorkers = createCloudflareWorkersTestConfig();
