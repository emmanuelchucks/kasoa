#!/usr/bin/env node
import { copyFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const args = process.argv.slice(2)
const preset = args.includes("--react") ? "react" : "base"

const __dirname = dirname(fileURLToPath(import.meta.url))
const configPath = resolve(__dirname, `${preset}.json`)
const targetPath = resolve(process.cwd(), ".oxfmtrc.json")

copyFileSync(configPath, targetPath)
console.log(`Created .oxfmtrc.json with ${preset} preset`)
