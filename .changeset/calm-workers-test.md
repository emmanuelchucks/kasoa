---
"@kasoa/vite-plus-config": minor
---

Make `cloudflare-workers` a test-only preset. This removes its `cloudflare` option and `@cloudflare/vite-plugin` dependency and requires Vite+ 0.2.1 or newer. Use Wrangler for backend Worker development and builds, and Vite+ for checks and workerd tests. Remove `@voidzero-dev/vite-plus-test` aliases or overrides and import test APIs from `vite-plus/test`.
