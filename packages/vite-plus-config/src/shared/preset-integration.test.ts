import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vite-plus/test";

interface LintResult {
  readonly output: string;
  readonly status: number | null;
}

const workspaceRoot = resolve(import.meta.dirname, "../../../..");
const vpPath = resolve(workspaceRoot, "node_modules/.bin/vp");
let fixturePath = "";

async function writeFixtureFile(name: string, contents: string): Promise<void> {
  await writeFile(resolve(fixturePath, name), contents);
}

async function usePreset(name: "node" | "react" | "react-native"): Promise<void> {
  const presetPath = resolve(import.meta.dirname, `../${name}/index.ts`);

  await writeFixtureFile(
    "vite.config.ts",
    `import { createConfig } from ${JSON.stringify(presetPath)};\n\nexport default createConfig();\n`,
  );
}

function lint(...files: readonly string[]): LintResult {
  const result = spawnSync(vpPath, ["lint", "--format", "unix", ...files], {
    cwd: fixturePath,
    encoding: "utf8",
  });

  return {
    output: `${result.stdout}${result.stderr}`,
    status: result.status,
  };
}

describe("preset lint integration", () => {
  beforeAll(async () => {
    const temporaryRoot = join(homedir(), "tmp");

    await mkdir(temporaryRoot, { recursive: true });
    fixturePath = await mkdtemp(join(temporaryRoot, "kasoa-presets-"));
    await symlink(resolve(workspaceRoot, "node_modules"), resolve(fixturePath, "node_modules"));
    await Promise.all([
      writeFixtureFile("package.json", '{"private":true,"type":"module"}\n'),
      writeFixtureFile(
        "tsconfig.json",
        '{"compilerOptions":{"allowImportingTsExtensions":true,"strict":true,"noEmit":true,"module":"Preserve","moduleResolution":"Bundler","jsx":"preserve","lib":["ESNext","DOM"]},"include":["**/*"]}\n',
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
        "web.tsx",
        "export function Screen(): JSX.Element {\n  return <div>Ready</div>;\n}\n\nexport const { title } = document;\n",
      ),
      writeFixtureFile(
        "native.tsx",
        'import { View } from "./view.ts";\n\nexport function Screen(): JSX.Element {\n  return <View role="button">Don\'t panic</View>;\n}\n',
      ),
      writeFixtureFile("dom.ts", "export const title = document.title;\n"),
      writeFixtureFile(
        "policy.test.ts",
        'import { expect, test, vi } from "vite-plus/test";\n\ntest("uses unambiguous matchers", () => {\n  const callback = vi.fn<() => void>();\n  callback();\n  expect(true).toBe(true);\n  expect(callback).toHaveBeenCalledOnce();\n});\n',
      ),
      writeFixtureFile("node.cjs", "module.exports = { ready: true };\n"),
    ]);
  });

  afterAll(async () => {
    await rm(fixturePath, { force: true, recursive: true });
  });

  it("executes the web, native, Node, and test policies", async () => {
    await usePreset("react");
    const webResult = lint("web.tsx");

    expect(webResult).toStrictEqual({ output: "", status: 0 });

    await usePreset("react-native");
    const nativeResult = lint("native.tsx", "policy.test.ts");

    expect(nativeResult).toStrictEqual({ output: "", status: 0 });

    const domResult = lint("dom.ts");

    expect(domResult.status).toBe(1);
    expect(domResult.output).toContain("[Error/eslint(no-undef)]");

    await usePreset("node");
    const nodeResult = lint("node.cjs");

    expect(nodeResult).toStrictEqual({ output: "", status: 0 });
  });
});
