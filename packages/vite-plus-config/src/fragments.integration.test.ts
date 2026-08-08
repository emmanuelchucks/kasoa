import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

interface LintResult {
  readonly output: string;
  readonly status: number | null;
}

const workspaceRoot = resolve(import.meta.dirname, "../../..");
const packageEntry = resolve(import.meta.dirname, "index.ts");
const cloudflarePackageEntry = resolve(import.meta.dirname, "cloudflare-workers/index.ts");
const vpPath = resolve(workspaceRoot, "node_modules/.bin/vp");
let fixturePath = "";

async function writeFixtureFile(name: string, contents: string): Promise<void> {
  await writeFile(resolve(fixturePath, name), contents);
}

async function useCloudflareTestFragments(): Promise<void> {
  await writeFixtureFile(
    "vite.config.ts",
    [
      `import { baseToolingConfig, cloudflareWorkerRuntimeConfig, cloudflareWorkerTestLintConfig, composeConfig } from ${JSON.stringify(packageEntry)};`,
      `import { createCloudflareTestConfig } from ${JSON.stringify(cloudflarePackageEntry)};`,
      "export default composeConfig(baseToolingConfig, cloudflareWorkerRuntimeConfig, cloudflareWorkerTestLintConfig, createCloudflareTestConfig());",
      "",
    ].join("\n"),
  );
}

async function useFragments(
  names: readonly string[],
  override = "{}",
  extraImports: readonly string[] = [],
): Promise<void> {
  await writeFixtureFile(
    "vite.config.ts",
    [
      `import { ${["composeConfig", ...names, ...extraImports].join(", ")} } from ${JSON.stringify(packageEntry)};`,
      `export default composeConfig(${names.join(", ")}, ${override}, { lint: { options: { typeAware: false, typeCheck: false } } });`,
      "",
    ].join("\n"),
  );
}

function runVp(...args: readonly string[]): LintResult {
  const result = spawnSync(vpPath, args, {
    cwd: fixturePath,
    encoding: "utf8",
  });

  return {
    output: `${result.stdout}${result.stderr}`,
    status: result.status,
  };
}

function lint(...files: readonly string[]): LintResult {
  return runVp("lint", "--format", "unix", ...files);
}

function format(...files: readonly string[]): LintResult {
  return runVp("fmt", "--check", "--no-error-on-unmatched-pattern", ...files);
}

function lintIgnored(file: string): LintResult {
  return runVp("lint", "--format", "unix", "--no-error-on-unmatched-pattern", file);
}

function expectUndefinedGlobal(result: LintResult, name: string): void {
  expect(result.status).toBe(1);
  expect(result.output).toContain(`'${name}' is not defined. [Error/eslint(no-undef)]`);
}

describe("composable configuration fragments", () => {
  beforeAll(async () => {
    const temporaryRoot = resolve(homedir(), "tmp");

    await mkdir(temporaryRoot, { recursive: true });
    fixturePath = await mkdtemp(resolve(temporaryRoot, "kasoa-fragments-"));
    await mkdir(resolve(fixturePath, ".expo"));
    await symlink(resolve(workspaceRoot, "node_modules"), resolve(fixturePath, "node_modules"));
    await Promise.all([
      writeFixtureFile("package.json", '{"private":true,"type":"module"}\n'),
      writeFixtureFile(
        "tsconfig.json",
        '{"compilerOptions":{"strict":true,"noEmit":true,"module":"Preserve","moduleResolution":"Bundler","jsx":"preserve","lib":["ESNext","DOM","WebWorker"],"types":["node"]},"include":["**/*"]}\n',
      ),
      writeFixtureFile(
        "runtime.d.ts",
        "declare const __DEV__: boolean;\ndeclare class HTMLRewriter {}\ndeclare class WebSocketPair {}\n",
      ),
      writeFixtureFile(
        "jsx.d.ts",
        "declare namespace JSX {\n  type Element = unknown;\n  interface IntrinsicElements {\n    div: { children?: string };\n    View: { children?: string; role?: string };\n  }\n}\n",
      ),
      writeFixtureFile(
        "view.ts",
        'export function View(_props: JSX.IntrinsicElements["View"]): JSX.Element {\n  return undefined;\n}\n',
      ),
      writeFixtureFile(
        "node.ts",
        'export const cwd = process.cwd();\nexport const bytes = Buffer.from("ready");\nconsole.info(cwd);\n',
      ),
      writeFixtureFile("dom.ts", "export const title = document.title;\n"),
      writeFixtureFile("worker.ts", "export const cacheStorage = caches;\n"),
      writeFixtureFile("worker-configuration.d.ts", "declare   const generated:any\n"),
      writeFixtureFile(".expo/generated.ts", "export   const generated:any=document.title\n"),
      writeFixtureFile(
        "wrangler.jsonc",
        '{"name":"kasoa-workerd-test","main":"worker-entry.ts","compatibility_date":"2026-08-08"}\n',
      ),
      writeFixtureFile(
        "worker-entry.ts",
        'export default {\n  fetch(): Response {\n    return new Response("ok");\n  },\n};\n',
      ),
      writeFixtureFile(
        "workerd.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("runs in workerd", () => {\n  expect([caches, new WebSocketPair()]).toHaveLength(2);\n});\n',
      ),
      writeFixtureFile(
        "cloudflare.ts",
        "export const pair = new WebSocketPair();\nexport const rewriter = new HTMLRewriter();\n",
      ),
      writeFixtureFile(
        "custom-tree.ts",
        'export function append(tree: { readonly appendChild: (value: string) => void }): void {\n  tree.appendChild("leaf");\n}\n',
      ),
      writeFixtureFile(
        "web.tsx",
        "export function Screen(): JSX.Element {\n  return <div>{document.title}</div>;\n}\n",
      ),
      writeFixtureFile(
        "native.tsx",
        'import { View } from "./view.ts";\n\nexport const signal = AbortSignal.abort();\nexport const url = new URL("https://example.com");\nexport const request = new Request(url);\nexport const timer = setTimeout(() => console.info(crypto.randomUUID()), 100);\n\nexport function Screen(): JSX.Element {\n  return <View role="button">{__DEV__ ? process.env.NODE_ENV : "ready"}</View>;\n}\n',
      ),
      writeFixtureFile(
        "web-profile.tsx",
        "function useThing(): void {}\n\nexport function WebProfile(ready: boolean): string {\n  if (ready) useThing();\n  return document.title;\n}\n",
      ),
      writeFixtureFile(
        "native-profile.tsx",
        "function useThing(): void {}\n\nexport function NativeProfile(ready: boolean): boolean {\n  if (ready) useThing();\n  setImmediate(() => console.info(FileReader, XMLHttpRequest, performance.now()));\n  alert('ready');\n  return __DEV__;\n}\n\nexport const invalid = [document.title, localStorage.length];\n",
      ),
      writeFixtureFile(
        "tool.config.ts",
        "export const cwd = process.cwd();\nexport const title = document.title;\n",
      ),
      writeFixtureFile(
        "tool.cjs",
        'const { basename } = require("node:path");\n\nmodule.exports = basename(__dirname);\n',
      ),
      writeFixtureFile("node-tool.config.ts", "export const cwd = process.cwd();\n"),
      writeFixtureFile(
        "browser-runtime.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("uses the browser", () => {\n  expect(document.title).toBe("");\n});\n',
      ),
      writeFixtureFile(
        "worker-runtime.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("uses workerd", () => {\n  expect([new WebSocketPair(), caches]).toHaveLength(2);\n});\n',
      ),
      writeFixtureFile(
        "node-runtime.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("uses Node", () => {\n  expect(process.cwd().length).toBeGreaterThanOrEqual(0);\n});\n',
      ),
      writeFixtureFile(
        "component.test.ts",
        'import { expect, test } from "vite-plus/test";\n\nfunction useThing(): void {}\nfunction Widget(ready: boolean): null {\n  if (ready) useThing();\n  return null;\n}\n\ntest("renders", () => {\n  expect(Widget(true)).toBe(null);\n});\n',
      ),
      writeFixtureFile(
        "dom-default.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("uses the configured runtime", () => {\n  expect(document.title).toBe("");\n});\n',
      ),
      writeFixtureFile(
        "padding.test.ts",
        'import { expect, test } from "vite-plus/test";\n\ntest("one", () => {\n  expect(1).toBe(1);\n});\ntest("two", () => {\n  expect(2).toBe(2);\n});\n',
      ),
      writeFixtureFile(
        "parameters.ts",
        'export function join(first: string, second: string, third: string, fourth: string): string {\n  return [first, second, third, fourth].join("");\n}\n',
      ),
    ]);
  });

  afterAll(async () => {
    await rm(fixturePath, { force: true, recursive: true });
  });

  it("keeps Node source inside the Node runtime", async () => {
    await useFragments(["baseToolingConfig", "nodeRuntimeConfig", "nodeTestLintConfig"]);

    expect(lint("node.ts", "custom-tree.ts")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("dom.ts"), "document");
    expectUndefinedGlobal(lint("worker.ts"), "caches");
    expectUndefinedGlobal(lint("cloudflare.ts"), "WebSocketPair");
  });

  it("separates browser source from Node configuration and tests", async () => {
    await useFragments([
      "baseToolingConfig",
      "browserRuntimeConfig",
      "reactCoreConfig",
      "reactDomConfig",
      "nodeTestLintConfig",
    ]);

    expect(lint("web.tsx", "node-tool.config.ts")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("tool.config.ts"), "document");
    expectUndefinedGlobal(lint("dom-default.test.ts"), "document");

    const componentResult = lint("component.test.ts");

    expect(componentResult.status).toBe(1);
    expect(componentResult.output).toContain("[Error/react-hooks(rules-of-hooks)]");
  });

  it("keeps React Native separate from DOM and Worker APIs", async () => {
    await useFragments([
      "baseToolingConfig",
      "reactCoreConfig",
      "reactNativeRuntimeConfig",
      "nodeTestLintConfig",
    ]);

    expect(lint("native.tsx", "tool.cjs")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("dom.ts"), "document");
    expectUndefinedGlobal(lint("worker.ts"), "caches");
    expectUndefinedGlobal(lint("cloudflare.ts"), "WebSocketPair");
  });

  it("provides complete React profiles for workspace overrides", async () => {
    await useFragments(
      ["baseToolingConfig"],
      '{ lint: { overrides: [{ files: ["web-profile.tsx"], ...reactWebLint }, { files: ["native-profile.tsx"], ...reactNativeLint }] } }',
      ["reactNativeLint", "reactWebLint"],
    );

    const webResult = lint("web-profile.tsx");

    expect(webResult.status).toBe(1);
    expect(webResult.output).toContain("[Error/react-hooks(rules-of-hooks)]");
    expect(webResult.output).not.toContain("'document' is not defined");

    const nativeResult = lint("native-profile.tsx");

    expect(nativeResult.status).toBe(1);
    expect(nativeResult.output).toContain("[Error/react-hooks(rules-of-hooks)]");
    expect(nativeResult.output).toContain("'document' is not defined");
    expect(nativeResult.output).toContain("'localStorage' is not defined");
    expect(nativeResult.output).not.toContain("'alert' is not defined");
    expect(nativeResult.output).not.toContain("'FileReader' is not defined");
    expect(nativeResult.output).not.toContain("'performance' is not defined");
    expect(nativeResult.output).not.toContain("'setImmediate' is not defined");
    expect(nativeResult.output).not.toContain("'XMLHttpRequest' is not defined");
    expect(nativeResult.output).not.toContain("'__DEV__' is not defined");
  });

  it("keeps Worker source separate from Node and the DOM", async () => {
    await useFragments([
      "baseToolingConfig",
      "cloudflareWorkerRuntimeConfig",
      "cloudflareWorkerTestLintConfig",
    ]);

    expect(lint("cloudflare.ts", "worker.ts")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("node.ts"), "process");
    expectUndefinedGlobal(lint("dom.ts"), "document");
    expectUndefinedGlobal(lint("tool.config.ts"), "document");
  });

  it("applies browser and Worker environments to their test files", async () => {
    await useFragments(["baseToolingConfig", "browserTestLintConfig"]);

    expect(lint("browser-runtime.test.ts")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("node-runtime.test.ts"), "process");

    await useFragments(["baseToolingConfig", "cloudflareWorkerTestLintConfig"]);

    expect(lint("worker-runtime.test.ts")).toStrictEqual({ output: "", status: 0 });
    expectUndefinedGlobal(lint("node-runtime.test.ts"), "process");
  });

  it("executes the Cloudflare test fragment in workerd", async () => {
    await useCloudflareTestFragments();

    expect(runVp("test", "workerd.test.ts", "--run").status).toBe(0);
  });

  it("keeps generated Worker and Expo files outside checks", async () => {
    await useFragments(["baseToolingConfig"]);

    const workerControl = lint("worker-configuration.d.ts");

    expect(workerControl.status).toBe(1);
    expect(workerControl.output).toContain("[Error/typescript(no-explicit-any)]");

    await useFragments(["baseToolingConfig", "cloudflareWorkerGeneratedConfig"]);

    const workerFormatResult = format("worker-configuration.d.ts");

    expect(workerFormatResult.status).toBe(0);
    expect(workerFormatResult.output).toContain("No files found matching the given patterns.");
    expect(lintIgnored("worker-configuration.d.ts").status).toBe(0);

    await useFragments(["baseToolingConfig", "reactNativeRuntimeConfig"]);

    const expoControl = lint(".expo/generated.ts");

    expect(expoControl.status).toBe(1);
    expect(expoControl.output).toContain("[Error/typescript(no-explicit-any)]");

    await useFragments([
      "baseToolingConfig",
      "reactNativeRuntimeConfig",
      "reactNativeGeneratedConfig",
    ]);

    expect(format(".expo/generated.ts").status).toBe(0);
    expect(lintIgnored(".expo/generated.ts").status).toBe(0);
  });

  it("lets consumer rules replace inherited rule tuples atomically", async () => {
    await useFragments(["baseToolingConfig"]);

    const defaultResult = lint("parameters.ts");

    expect(defaultResult.status).toBe(1);
    expect(defaultResult.output).toContain("[Error/eslint(max-params)]");

    await useFragments(
      ["baseToolingConfig"],
      '{ lint: { rules: { "max-params": ["error", { max: 4 }] } } }',
    );

    expect(lint("parameters.ts")).toStrictEqual({ output: "", status: 0 });
  });

  it("lets consumers build a transparent test-policy override", async () => {
    await useFragments(
      ["baseToolingConfig"],
      '{ lint: { overrides: [{ files: [...TEST_FILES], ...nodeTestLint, rules: { ...nodeTestLint.rules, "vitest/padding-around-test-blocks": "off" } }] } }',
      ["TEST_FILES", "nodeTestLint"],
    );

    const result = lint("padding.test.ts");

    expect(result).toStrictEqual({ output: "", status: 0 });
  });
});
