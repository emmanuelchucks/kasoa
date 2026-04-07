---
"@kasoa/vite-plus-config": patch
---

Simplify the public preset surface and tighten the Cloudflare Worker setup.

- rename the `server` preset to `node`
- remove the root package entrypoint and the `test/cloudflare-workers` public subpath
- add a dedicated `cloudflare-workers` preset for Cloudflare Worker dev and test setup
- require `vitest` to resolve to `@voidzero-dev/vite-plus-test` for Cloudflare Worker tests and fail early with a clear error when it does not
