import {
  baseToolingConfig,
  composeConfig,
  workspaceRunConfig,
} from "./packages/vite-plus-config/src/index.ts";

export default composeConfig(baseToolingConfig, workspaceRunConfig, {
  run: {
    tasks: {
      "verify-packages": {
        cache: false,
        command: "pnpm -r --if-present run verify:package",
        dependsOn: ["build"],
      },
      release: {
        cache: false,
        command: "pnpm exec changeset publish",
        dependsOn: ["check", "test", "verify-packages"],
      },
    },
  },
});
