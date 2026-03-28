import { defineConfig } from "vite-plus";
import { library } from "../vite-plus-config/src/library/index.ts";

const libraryPack = (Array.isArray(library.pack) ? library.pack[0] : library.pack) ?? {};

export default defineConfig({
  ...library,
  pack: {
    ...libraryPack,
    clean: true,
    entry: {
      "src/base": "./src/base.ts",
      "src/react": "./src/react.ts",
    },
  },
});
