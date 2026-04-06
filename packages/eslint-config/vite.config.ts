import { createLibraryConfig } from "../vite-plus-config/src/library/index.ts";

export default createLibraryConfig({
  pack: {
    entry: {
      "src/base/index": "./src/base/index.ts",
      "src/node/index": "./src/node/index.ts",
      "src/react/index": "./src/react/index.ts",
    },
  },
});
