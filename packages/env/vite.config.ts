import { createLibraryConfig } from "../vite-plus-config/src/library/index.ts";

export default createLibraryConfig({
  pack: {
    entry: {
      "src/index": "./src/index.ts",
    },
  },
});
