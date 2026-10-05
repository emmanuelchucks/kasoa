---
"@kasoa/vite-plus-config": minor
---

Remove three style rules that added friction without preventing defects: `promise/prefer-await-to-then`, `unicorn/no-await-expression-member`, and `typescript/explicit-module-boundary-types`.

Support projects managed by the `cf` CLI: `createCloudflareTestConfig` reads `cloudflare.config.ts` when present (falling back to `wrangler.jsonc`), and generated `.cloudflare/` output is ignored. `wrangler` is no longer a peer dependency because `@cloudflare/vitest-plugin` bundles it.
