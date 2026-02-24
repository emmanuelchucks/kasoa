import { mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { base } from "../src/base/index.ts";
import { react } from "../src/react/index.ts";

const ROOT = resolve(import.meta.dirname, "..");

async function writeJsonFile(path: string, data: unknown) {
  const serialized = JSON.stringify(data, null, 2);
  if (serialized === undefined) {
    throw new Error(`Could not serialize JSON for ${path}`);
  }

  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${serialized}\n`, "utf8");
}

async function run() {
  await rm(resolve(ROOT, "dist"), { force: true, recursive: true });

  await writeJsonFile(resolve(ROOT, "dist/src/base/index.json"), base);
  await writeJsonFile(resolve(ROOT, "dist/src/react/index.json"), react);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
