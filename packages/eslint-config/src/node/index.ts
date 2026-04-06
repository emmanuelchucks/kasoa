import { defineConfig } from "@eslint/config-helpers";
import { base } from "../base/index.ts";
import { nodeConfig } from "./n.ts";
import { vitestConfig } from "./vitest.ts";

export const node: ReturnType<typeof defineConfig> = defineConfig(base, nodeConfig, vitestConfig);
