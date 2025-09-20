import { defineConfig } from "eslint/config";
import { base } from "../base/index.js";
import { nodeConfig } from "./n.js";

export const node = defineConfig(base, nodeConfig);
