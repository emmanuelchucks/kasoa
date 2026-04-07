import { createRequire } from "node:module";
import { join } from "node:path";
import process from "node:process";

const projectRequire = createRequire(join(process.cwd(), "package.json"));

export function assertVitePlusVitestAlias(): void {
  if (process.env.VITEST !== "true") {
    return;
  }

  let resolvedPath: string;

  try {
    resolvedPath = projectRequire.resolve("vitest/package.json");
  } catch {
    throw new Error(
      [
        "Cloudflare Worker tests require `vitest` to resolve to Vite+'s test package.",
        "Install it as an alias, for example:",
        "`pnpm add -D vitest@npm:@voidzero-dev/vite-plus-test@latest`",
      ].join("\n"),
    );
  }

  if (
    !resolvedPath.includes("@voidzero-dev+vite-plus-test") &&
    !resolvedPath.includes("@voidzero-dev/vite-plus-test")
  ) {
    throw new Error(
      [
        "Cloudflare Worker tests require `vitest` to resolve to `@voidzero-dev/vite-plus-test`.",
        `Resolved instead to: ${resolvedPath}`,
        "Install it as an alias, for example:",
        "`pnpm add -D vitest@npm:@voidzero-dev/vite-plus-test@latest`",
      ].join("\n"),
    );
  }
}
