import { defineConfig } from "eslint/config";
import { base } from "../base/index.ts";
import { nodeConfig } from "./n.ts";
import { vitestConfig } from "./vitest.ts";

export const node = defineConfig(base, nodeConfig, vitestConfig);
