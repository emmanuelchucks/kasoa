# @kasoa/vite-plus-config

Kasoa's Vite+ configurations

## Installation

Install Vite+ and the shared config:

```bash
pnpm add -D @kasoa/vite-plus-config vite-plus
```

**Note**: Requires Node.js >=24 and TypeScript-first projects.

## Usage

Create a local `vite.config.ts` and re-export the shared preset that matches the project.

### Base Config

```ts
export { base as default } from "@kasoa/vite-plus-config/base";
```

### React Projects

```ts
export { react as default } from "@kasoa/vite-plus-config/react";
```

### Server Projects

```ts
export { server as default } from "@kasoa/vite-plus-config/server";
```

### Libraries

```ts
export { library as default } from "@kasoa/vite-plus-config/library";
```

### Monorepo Root

```ts
export { monorepo as default } from "@kasoa/vite-plus-config/monorepo";
```

## Composing Presets

Use Vite+'s normal `defineConfig` API when a project needs to mix presets or add overrides.

```ts
import { defineConfig } from "vite-plus";
import { library } from "@kasoa/vite-plus-config/library";
import { react } from "@kasoa/vite-plus-config/react";

export default defineConfig({
  ...react,
  pack: library.pack,
  lint: {
    ...react.lint,
    rules: {
      ...react.lint?.rules,
      "no-console": "warn",
    },
  },
});
```

## Cloudflare Workers Tests

For Worker projects, the package also ships a thin Cloudflare test preset that wires up `cloudflareTest()` with a default root `wrangler.jsonc`.

```bash
pnpm add -D @cloudflare/vitest-pool-workers wrangler
```

```ts
import { defineConfig } from "vite-plus";
import { server } from "@kasoa/vite-plus-config/server";
import { createCloudflareWorkersTestConfig } from "@kasoa/vite-plus-config/test/cloudflare-workers";

const cloudflareWorkers = createCloudflareWorkersTestConfig({
  miniflare: {
    bindings: {
      CORS_ALLOWED_ORIGINS: "",
    },
  },
});

export default defineConfig({
  ...server,
  ...cloudflareWorkers,
  test: {
    ...cloudflareWorkers.test,
    provide: {
      d1Migrations: [],
    },
  },
});
```

The shared preset only covers the repeated Worker runtime wiring. Project-specific migrations, bindings, coverage, setup files, and `test.provide` values should stay in the consuming project.

At the moment, Cloudflare Worker projects should prefer plain `vitest --config vite.config.ts` for running tests. The Worker test preset itself is validated, but `vp test` is not yet a recommended path there because the current `vite-plus-test` runner still appears to have compatibility issues with this setup.

## Recommended Workflow

- For Vite+-first apps and packages, prefer a simple `check` script that runs `vp check`.
- Pair it with `check:fix` that runs `vp check --fix`.
- Use `vp check` for formatting, linting, and type checking in one pass.
- Use `vp check --fix` for autofixable formatting and linting issues.
- Use `vp config` if you want commit hooks generated from the shared `staged` rules.
- Use one `vite.config.ts` by default, then keep separate config files only when a project genuinely needs them.

Example:

```json
{
  "scripts": {
    "check": "vp check",
    "check:fix": "vp check --fix"
  }
}
```

## Configurations

- **`base`**: Strict TypeScript-first format, lint, test include, and staged-file defaults.
- **`react`**: Extends `base` with React lint rules and Tailwind-aware formatting.
- **`server`**: Extends `base` with server-oriented lint rules.
- **`library`**: Extends `base` with ESM-only packaging defaults for `vp pack`.
- **`monorepo`**: Extends `base` with root-only `run` defaults for workspace caching.
- **`test/cloudflare-workers`**: Optional Cloudflare Worker test wiring for Vitest.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
