import { createLibraryConfig } from "./src/library/index.ts";

export default createLibraryConfig({
  pack: {
    deps: {
      neverBundle: ["vite-plus", "@cloudflare/vitest-pool-workers", "wrangler"],
    },
    entry: {
      "src/*": "./src/*/index.ts",
    },
  },
});
