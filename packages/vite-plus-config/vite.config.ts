import {
  baseToolingConfig,
  composeConfig,
  libraryPackConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
} from "./src/index.ts";

export default composeConfig(
  baseToolingConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
  libraryPackConfig,
  {
    pack: {
      deps: {
        neverBundle: ["vite-plus", "@cloudflare/vitest-pool-workers", "wrangler"],
      },
      entry: {
        "src/index": "./src/index.ts",
        "src/cloudflare-workers/index": "./src/cloudflare-workers/index.ts",
      },
    },
  },
);
