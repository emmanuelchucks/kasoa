import { defineConfig } from "vite-plus";
import { monorepo } from "./packages/vite-plus-config/src/monorepo/index.ts";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  ...monorepo,
  run: {
    ...monorepo.run,
    tasks: {
      ...monorepo.run?.tasks,
      ci: {
        command: "vp run build && vp run check && vp run test",
      },
      release: {
        cache: false,
        command: "pnpm exec changeset publish",
        dependsOn: ["ci"],
      },
    },
  },
});
