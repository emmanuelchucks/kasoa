import { URL, fileURLToPath } from "node:url";

// Oxlint loads a JS plugin from its file. Run from source, that is the TypeScript entry beside this
// module (Node strips its types); from the published package, the built entry the package exports.
export const kasoaPluginFile: string = fileURLToPath(
  import.meta.url.endsWith(".ts")
    ? new URL("plugin/index.ts", import.meta.url)
    : import.meta.resolve("@kasoa/vite-plus-config/oxlint-plugin"),
);
