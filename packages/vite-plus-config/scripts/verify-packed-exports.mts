import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, resolve as resolvePath } from "node:path";
import process from "node:process";

const packageRoot = resolvePath(import.meta.dirname, "..");
const packageNodeModules = resolvePath(packageRoot, "node_modules");

function run(command: string, args: readonly string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit" });

    child.once("error", reject);
    child.once("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with status ${String(code)}`));
    });
  });
}

async function linkDependency(fixturePath: string, name: string): Promise<void> {
  const linkPath = resolvePath(fixturePath, "node_modules", name);

  await mkdir(dirname(linkPath), { recursive: true });
  await symlink(resolvePath(packageNodeModules, name), linkPath);
}

async function typeCheck(fixturePath: string): Promise<void> {
  await run(
    process.execPath,
    [resolvePath(fixturePath, "node_modules/typescript/bin/tsc"), "--project", "tsconfig.json"],
    fixturePath,
  );
}

const temporaryRoot = resolvePath(homedir(), "tmp");

await mkdir(temporaryRoot, { recursive: true });
const fixturePath = await mkdtemp(resolvePath(temporaryRoot, "kasoa-packed-exports-"));

try {
  await run("pnpm", ["pack", "--pack-destination", fixturePath], packageRoot);
  const files = await readdir(fixturePath);
  const tarballName = files.find((file) => file.endsWith(".tgz"));

  if (tarballName === undefined) {
    throw new Error("pnpm pack did not create a tarball");
  }

  await run("tar", ["-xzf", resolvePath(fixturePath, tarballName)], fixturePath);
  await Promise.all([
    linkDependency(fixturePath, "typescript"),
    linkDependency(fixturePath, "vite-plus"),
  ]);
  await mkdir(resolvePath(fixturePath, "node_modules/@kasoa"), { recursive: true });
  await symlink(
    resolvePath(fixturePath, "package"),
    resolvePath(fixturePath, "node_modules/@kasoa/vite-plus-config"),
  );
  await writeFile(
    resolvePath(fixturePath, "root-consumer.mjs"),
    `import {
  CODE_FILES,
  COMMONJS_FILES,
  CONFIG_FILES,
  RUNTIME_OVERRIDE_EXCLUDE_FILES,
  TEST_FILES,
  baseToolingConfig,
  browserLint,
  browserRuntimeConfig,
  browserTestLint,
  browserTestLintConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerLint,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerTestLint,
  cloudflareWorkerTestLintConfig,
  composeConfig,
  libraryPackConfig,
  libraryPackDefaults,
  nodeLint,
  nodeRuntimeConfig,
  nodeTestLint,
  nodeTestLintConfig,
  reactCoreConfig,
  reactCoreLint,
  reactDomConfig,
  reactDomLint,
  reactNativeGeneratedConfig,
  reactNativeLint,
  reactNativeRuntimeConfig,
  reactNativeRuntimeLint,
  reactWebLint,
  workspaceRunConfig,
} from "@kasoa/vite-plus-config";

const fragments = [baseToolingConfig, browserRuntimeConfig, browserTestLintConfig, cloudflareWorkerGeneratedConfig, cloudflareWorkerRuntimeConfig, cloudflareWorkerTestLintConfig, libraryPackConfig, nodeRuntimeConfig, nodeTestLintConfig, reactCoreConfig, reactDomConfig, reactNativeGeneratedConfig, reactNativeRuntimeConfig, workspaceRunConfig];
const profiles = [browserLint, browserTestLint, cloudflareWorkerLint, cloudflareWorkerTestLint, nodeLint, nodeTestLint, reactCoreLint, reactDomLint, reactNativeLint, reactNativeRuntimeLint, reactWebLint];
const patterns = [CODE_FILES, COMMONJS_FILES, CONFIG_FILES, RUNTIME_OVERRIDE_EXCLUDE_FILES, TEST_FILES];
const config = composeConfig(baseToolingConfig, nodeRuntimeConfig, nodeTestLintConfig);
if (config.lint?.env?.node !== true) throw new Error("Node fragment did not compose");
if (fragments.some((fragment) => typeof fragment !== "object")) throw new Error("Invalid config fragment");
if (profiles.some((profile) => typeof profile !== "object")) throw new Error("Invalid lint profile");
if (patterns.some((pattern) => pattern.length === 0)) throw new Error("Empty file pattern");
if (libraryPackDefaults.format?.[0] !== "esm") throw new Error("Invalid pack defaults");
`,
  );
  await writeFile(
    resolvePath(fixturePath, "root.config.mts"),
    `import type { ConfigFragment } from "@kasoa/vite-plus-config";
import type { Plugin } from "vite-plus";
import {
  baseToolingConfig,
  composeConfig,
  libraryPackConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
} from "@kasoa/vite-plus-config";

const plugin = { name: "consumer-plugin" } satisfies Plugin;
const override = { plugins: [plugin], resolve: { alias: { "#": new URL("./src", import.meta.url).pathname } } } satisfies ConfigFragment;
export default composeConfig(baseToolingConfig, nodeRuntimeConfig, nodeTestLintConfig, libraryPackConfig, override);
`,
  );
  await writeFile(
    resolvePath(fixturePath, "tsconfig.json"),
    '{"compilerOptions":{"module":"NodeNext","moduleResolution":"NodeNext","noEmit":true,"skipLibCheck":true,"strict":true,"target":"ES2024"},"include":["*.mts"]}\n',
  );
  await run(process.execPath, [resolvePath(fixturePath, "root-consumer.mjs")], fixturePath);
  await typeCheck(fixturePath);

  await Promise.all([
    linkDependency(fixturePath, "@cloudflare/vitest-pool-workers"),
    linkDependency(fixturePath, "wrangler"),
  ]);
  await writeFile(
    resolvePath(fixturePath, "cloudflare-consumer.mjs"),
    `import {
  baseToolingConfig,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerTestLintConfig,
  composeConfig,
} from "@kasoa/vite-plus-config";
import { createCloudflareTestConfig } from "@kasoa/vite-plus-config/cloudflare-workers";

const testFragment = createCloudflareTestConfig();
if (testFragment.plugins === undefined) throw new Error("Cloudflare test fragment is empty");
const config = composeConfig(baseToolingConfig, cloudflareWorkerRuntimeConfig, cloudflareWorkerTestLintConfig, testFragment);
if (config.plugins === undefined) throw new Error("Cloudflare test fragment did not compose");
`,
  );
  await writeFile(
    resolvePath(fixturePath, "cloudflare.config.mts"),
    `import {
  baseToolingConfig,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerTestLintConfig,
  composeConfig,
} from "@kasoa/vite-plus-config";
import type { CloudflareTestConfigOptions } from "@kasoa/vite-plus-config/cloudflare-workers";
import { createCloudflareTestConfig } from "@kasoa/vite-plus-config/cloudflare-workers";

const options = {} satisfies CloudflareTestConfigOptions;
export default composeConfig(baseToolingConfig, cloudflareWorkerRuntimeConfig, cloudflareWorkerTestLintConfig, createCloudflareTestConfig(options));
`,
  );
  await run(process.execPath, [resolvePath(fixturePath, "cloudflare-consumer.mjs")], fixturePath);
  await typeCheck(fixturePath);
} finally {
  await rm(fixturePath, { force: true, recursive: true });
}
