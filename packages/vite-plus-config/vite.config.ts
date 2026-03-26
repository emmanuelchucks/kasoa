import { defineConfig } from "vite-plus";
import { library } from "./src/library/index.ts";

const libraryPack = (Array.isArray(library.pack) ? library.pack[0] : library.pack) ?? {};

export default defineConfig({
  ...library,
  pack: {
    ...libraryPack,
    clean: true,
    deps: {
      neverBundle: ["vite-plus", "oxfmt", "oxlint", "@cloudflare/vitest-pool-workers", "wrangler"],
    },
    entry: {
      "src/index": "./src/index.ts",
      "src/*": "./src/*/index.ts",
      "src/test/cloudflare-workers/index": "./src/test/cloudflare-workers/index.ts",
    },
  },
});
