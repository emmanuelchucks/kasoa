import { createMonorepoConfig } from "./packages/vite-plus-config/src/monorepo/index.ts";

export default createMonorepoConfig({
  run: {
    tasks: {
      release: {
        cache: false,
        command: "pnpm exec changeset publish",
        dependsOn: ["build", "check", "test"],
      },
    },
  },
});
