import { createLibraryConfig } from "./src/library/index.ts";

export default createLibraryConfig({
  pack: {
    deps: {
      neverBundle: ["vite-plus", "@cloudflare/vitest-pool-workers", "wrangler"],
    },
    entry: {
      "src/index": "./src/index.ts",
      "src/*": "./src/*/index.ts",
      "src/test/cloudflare-workers/index": "./src/test/cloudflare-workers/index.ts",
    },
  },
});
