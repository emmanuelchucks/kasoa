#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
let preset = "base";

if (args.includes("--react")) {
  preset = "react";
} else if (args.includes("--node")) {
  preset = "node";
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const configPath = resolve(__dirname, `${preset}.json`);
const targetConfigPath = resolve(process.cwd(), ".oxlintrc.json");
const targetPluginsDir = resolve(process.cwd(), "plugins");
const sourcePluginsDir = resolve(__dirname, "plugins");

// Copy the main config file
copyFileSync(configPath, targetConfigPath);
console.log(`Created .oxlintrc.json with ${preset} preset`);

// Copy all plugin files
mkdirSync(targetPluginsDir, { recursive: true });
const pluginFiles = readdirSync(sourcePluginsDir);

for (const file of pluginFiles) {
  if (file.endsWith(".json")) {
    const sourcePath = join(sourcePluginsDir, file);
    const targetPath = join(targetPluginsDir, file);
    copyFileSync(sourcePath, targetPath);
    console.log(`Copied plugins/${file}`);
  }
}

console.log("\nOxlint configuration setup complete!");