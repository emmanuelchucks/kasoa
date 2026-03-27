export const DEFAULT_TEST_INCLUDE = ["**/*.{test,spec}.{ts,tsx,mts,cts}"] as const;
export const GENERATED_FILE_IGNORE_PATTERNS = [
  "**/worker-configuration.d.ts",
  "**/drizzle/migrations.js",
  "**/drizzle/meta/*.json",
] as const;

export const DEFAULT_STAGED_CHECK_GLOB = "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}";
export const DEFAULT_STAGED_CHECK_COMMAND = "vp check --fix";
export const DEFAULT_WRANGLER_CONFIG_PATH = "./wrangler.jsonc";
