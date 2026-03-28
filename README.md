# Kasoa

Shared tooling packages for Emmanuel Chucks' projects.

This monorepo is built around `pnpm` workspaces and `vite-plus` for repo-wide checks, builds, and tests.

## Workflow

```bash
pnpm check
pnpm check:fix
pnpm build
pnpm test
```

## Packages

- **[@kasoa/env](./packages/env)** - Type-safe environment variable validation with Standard Schema
- **[@kasoa/eslint-config](./packages/eslint-config)** - ESLint configurations for base, Node.js, and React projects
- **[@kasoa/oxfmt-config](./packages/oxfmt-config)** - Oxfmt configurations for base and React projects
- **[@kasoa/oxlint-config](./packages/oxlint-config)** - Oxlint configurations for base, Node.js, and React projects
- **[@kasoa/prettier-config](./packages/prettier-config)** - Prettier configurations with Tailwind CSS support
- **[@kasoa/vite-plus-config](./packages/vite-plus-config)** - Opinionated Vite+ presets for base, React, server, library, monorepo, and Cloudflare Workers test setups

## Notes

- `@kasoa/vite-plus-config` is the forward path for unified linting, formatting, type checking, and related tooling.
- The Oxlint and Oxfmt packages still exist alongside it and remain usable where needed.

## Author

Emmanuel Chucks  
https://emmanuelchucks.com

## License

MIT
