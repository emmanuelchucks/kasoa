# Kasoa

Shared TypeScript tooling for Emmanuel Chucks' projects. Requires Node.js 24.11 or newer.

## Packages

- [`@kasoa/vite-plus-config`](./packages/vite-plus-config) — Vite+ presets for applications, libraries, monorepos, React, React Native, Node.js, and Cloudflare Workers tests.
- [`@kasoa/env`](./packages/env) — Standard Schema environment validation.

## Repository checks

```bash
pnpm check
pnpm test
pnpm build
pnpm exec vp run verify-packages
```

`verify-packages` runs Publint and Are The Types Wrong against packed artifacts.

## License

MIT
