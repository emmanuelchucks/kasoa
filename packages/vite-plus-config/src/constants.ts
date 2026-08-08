export const CODE_FILES = ["**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"] as const;
export const COMMONJS_FILES = ["**/*.{cjs,cts}"] as const;
export const CONFIG_FILES = ["**/*.config.{js,jsx,ts,tsx,mjs,cjs,mts,cts}"] as const;
export const TEST_FILES = [
  "**/test/**",
  "**/tests/**",
  "**/__tests__/**",
  "**/*.{test,spec}.{js,jsx,ts,tsx,mjs,cjs,mts,cts}",
] as const;
export const RUNTIME_OVERRIDE_EXCLUDE_FILES: readonly string[] = [
  ...COMMONJS_FILES,
  ...CONFIG_FILES,
  ...TEST_FILES,
] as const;

export const DEFAULT_IGNORE_PATTERNS = [
  "node_modules/**",
  "dist/**",
  "dist-ssr/**",
  "**/.wrangler/**",
  "**/migrations/**",
  "**/drizzle/migrations.js",
  "**/drizzle/meta/*.json",
] as const;
export const CLOUDFLARE_WORKER_IGNORE_PATTERNS = ["**/worker-configuration.d.ts"] as const;
export const REACT_NATIVE_IGNORE_PATTERNS = ["**/.expo/**"] as const;

export const DEFAULT_STAGED_CHECK_GLOB = "*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}";
export const DEFAULT_STAGED_CHECK_COMMAND = "vp check --fix";
export const DEFAULT_WRANGLER_CONFIG_PATH = "./wrangler.jsonc";
