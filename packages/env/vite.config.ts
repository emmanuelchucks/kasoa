import {
  baseToolingConfig,
  composeConfig,
  libraryPackConfig,
  nodeTestLintConfig,
} from "../vite-plus-config/src/index.ts";

export default composeConfig(baseToolingConfig, nodeTestLintConfig, libraryPackConfig, {
  pack: {
    entry: {
      "src/index": "./src/index.ts",
    },
  },
});
