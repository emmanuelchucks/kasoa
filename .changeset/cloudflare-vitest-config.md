---
"@kasoa/vite-plus-config": patch
---

Pass `config: true` to `@cloudflare/vitest-plugin` when `cloudflare.config.ts` is present instead of the removed `experimental.newConfig` option, and require `@cloudflare/vitest-plugin` 1.5 or newer.
