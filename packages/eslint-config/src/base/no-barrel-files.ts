import noBarrelFiles from "eslint-plugin-no-barrel-files";
import { defineConfig } from "eslint/config";

export const noBarrelFilesConfig = defineConfig(noBarrelFiles.flat, {
  rules: {
    "no-barrel-files/no-barrel-files": "error",
  },
});
