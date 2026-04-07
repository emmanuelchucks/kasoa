---
"@kasoa/vite-plus-config": patch
---

Remove the Cloudflare Worker `vitest` alias runtime assertion.

The Worker preset still requires `vitest` to resolve to `@voidzero-dev/vite-plus-test`, but the package now leaves that as documented setup instead of enforcing it at runtime. This avoids false failures in monorepos where `process.cwd()` does not reliably identify the consumer package root.
