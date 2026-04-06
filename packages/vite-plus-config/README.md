# @kasoa/vite-plus-config

Kasoa's Vite+ configurations

## Installation

Install Vite+ and the shared config:

```bash
pnpm add -D @kasoa/vite-plus-config vite-plus
```

**Note**: Requires Node.js >=24 and TypeScript-first projects.

## Usage

Create a local `vite.config.ts` and call the shared preset factory that matches the project.

### Base Config

```ts
import { createConfig } from "@kasoa/vite-plus-config/base";

export default createConfig();
```

### React Projects

```ts
import { createConfig } from "@kasoa/vite-plus-config/react";

export default createConfig();
```

### Server Projects

```ts
import { createConfig } from "@kasoa/vite-plus-config/server";

export default createConfig();
```

### Libraries

```ts
import { createConfig } from "@kasoa/vite-plus-config/library";

export default createConfig();
```

### Monorepo Root

```ts
import { createConfig } from "@kasoa/vite-plus-config/monorepo";

export default createConfig();
```

## Customizing a Preset

Pass overrides directly to the preset factory. Nested config is merged so consumers can stay strict by default and still tweak what they need.

```ts
import { createConfig } from "@kasoa/vite-plus-config/react";

export default createConfig({
  lint: {
    rules: {
      "no-console": "warn",
    },
  },
  test: {
    coverage: {
      reporter: ["text", "html"],
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
import { createConfig } from "@kasoa/vite-plus-config/server";
import { createCloudflareWorkersTestConfig } from "@kasoa/vite-plus-config/test/cloudflare-workers";

export default createConfig(
  createCloudflareWorkersTestConfig({
    miniflare: {
      bindings: {
        CORS_ALLOWED_ORIGINS: "",
      },
    },
    test: {
      provide: {
        d1Migrations: [],
      },
    },
  }),
);
```

The shared preset only covers the repeated Worker runtime wiring. Project-specific migrations, bindings, coverage, setup files, and `test.provide` values should stay in the consuming project.

This preset assumes the consuming project is already set up like a normal Vite+ project, including Vite+'s standard `vite` and `vitest` overrides.

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
- **`react`**: `base` plus React lint rules and Tailwind-aware formatting.
- **`server`**: `base` plus server-oriented lint rules.
- **`library`**: `base` plus ESM-only packaging defaults for `vp pack`.
- **`monorepo`**: `base` plus root-only `run` defaults for workspace caching.
- **`test/cloudflare-workers`**: Optional Cloudflare Worker test wiring for Vitest.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
