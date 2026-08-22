# Kasoa

Shared TypeScript tooling for Emmanuel Chucks' projects. Requires Node.js 24.11 or newer.

## Packages

- [`@kasoa/vite-plus-config`](./packages/vite-plus-config) — strict, composable Vite+ configuration fragments.
- [`@kasoa/env`](./packages/env) — Standard Schema environment validation.

## Repository verification

```bash
pnpm verify
```

The canonical gate audits dependencies, checks formatting across the complete repository, checks every package, runs tests, builds the ESM packages, applies strict Publint and ESM-only ATTW validation, and exercises the packed consumer fixtures. Pull requests and pushes to `main` run the same command in GitHub Actions.

## License

MIT
