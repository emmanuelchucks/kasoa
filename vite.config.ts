import { createMonorepoConfig } from "./packages/vite-plus-config/src/monorepo/index.ts";

export default createMonorepoConfig({
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
