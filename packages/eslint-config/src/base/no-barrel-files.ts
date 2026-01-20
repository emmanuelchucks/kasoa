import type { Config } from "eslint/config";
import noBarrelFiles from "eslint-plugin-no-barrel-files";
import { defineConfig } from "eslint/config";

export const noBarrelFilesConfig = defineConfig(
  noBarrelFiles.flat as unknown as Config,
  {
    rules: {
      "no-barrel-files/no-barrel-files": "error",
    },
  },
);
