import { createLibraryConfig } from "../vite-plus-config/src/library/index.ts";

export default createLibraryConfig({
  pack: {
    entry: {
      "src/base": "./src/base.ts",
      "src/react": "./src/react.ts",
    },
  },
});
