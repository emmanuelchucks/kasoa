import { createMonorepoConfig } from "./packages/vite-plus-config/src/monorepo/index.ts";

export default createMonorepoConfig({
  run: {
    tasks: {
      build: {
        command: "vp run -r build",
      },
      check: {
        command: "vp run -r check",
      },
      "check:fix": {
        command: "vp run -r check:fix",
      },
      test: {
        command: "vp run -r test",
      },
      release: {
        cache: false,
        command: "pnpm exec changeset publish",
        dependsOn: ["build", "check", "test"],
      },
    },
  },
});
