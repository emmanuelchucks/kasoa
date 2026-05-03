import type { PluginConfig as CloudflareVitePluginConfig } from "@cloudflare/vite-plugin";
import type { UserConfig } from "vite-plus";
import { cloudflare } from "@cloudflare/vite-plugin";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import process from "node:process";
import { createNodeConfig } from "../node/index.ts";
import { createDefinedConfig, mergeConfigFragments } from "../shared/config.ts";
import { DEFAULT_WRANGLER_CONFIG_PATH } from "../shared/constants.ts";

type CloudflareWorkersPluginOptions = Exclude<
  NonNullable<Parameters<typeof cloudflareTest>[0]>,
  (...args: readonly never[]) => unknown
>;

export interface CloudflareWorkersConfigOptions extends Omit<
  CloudflareWorkersPluginOptions,
  "wrangler"
> {
  readonly cloudflare?: CloudflareVitePluginConfig | false;
  readonly config?: UserConfig;
  readonly include?: readonly string[];
  readonly test?: UserConfig["test"];
  readonly wrangler?: CloudflareWorkersPluginOptions["wrangler"];
}

export function createCloudflareWorkersConfig<
  const Options extends CloudflareWorkersConfigOptions = CloudflareWorkersConfigOptions,
>(options?: Options): UserConfig & Pick<Options, never> {
  const {
    cloudflare: cloudflareOptions = {},
    config = {},
    include,
    test,
    wrangler,
    ...testPluginOptions
  } = options ?? {};
  const isTest = process.env.VITEST === "true";
  const cloudflareTestConfig = createDefinedConfig(
    {
      plugins: [
        cloudflareTest({
          ...testPluginOptions,
          wrangler: {
            configPath: DEFAULT_WRANGLER_CONFIG_PATH,
            ...wrangler,
          },
        }),
      ],
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

  return createNodeConfig(
    mergeConfigFragments(
      cloudflareTestConfig,
      !isTest && cloudflareOptions !== false
        ? {
            plugins: [...cloudflare(cloudflareOptions)],
          }
        : {},
      config,
    ),
  );
}

export { createCloudflareWorkersConfig as createConfig };
