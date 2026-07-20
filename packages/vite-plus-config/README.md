# @kasoa/vite-plus-config

Kasoa's shared Vite+ presets for formatting, linting, and type checking.

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

### Node Projects

```ts
import { createConfig } from "@kasoa/vite-plus-config/node";

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

The `cloudflare-workers` preset combines the Node.js preset with `cloudflareTest()` and reads `wrangler.jsonc` from the project root by default. Vite+ provides Vitest; import test APIs from `vite-plus/test`.

```bash
pnpm add -D @cloudflare/vitest-pool-workers wrangler
```

```ts
import { createConfig } from "@kasoa/vite-plus-config/cloudflare-workers";

export default createConfig({
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
});
```

Use Wrangler for backend Worker development, builds, type generation, remote development, and deployment. Use Vite+ for checks and Worker tests:

```json
{
  "scripts": {
    "dev": "wrangler dev",
    "build": "wrangler deploy --dry-run",
    "check": "vp check",
    "test": "vp test"
  }
}
```

Keep project-specific migrations, bindings, coverage, setup files, and `test.provide` values in the consuming project. Vite-owned frontend and full-stack applications should configure `@cloudflare/vite-plugin` with their project-specific plugins.

## Recommended Workflow

```json
{
  "scripts": {
    "check": "vp check",
    "check:fix": "vp check --fix"
  }
}
```

`vp check` formats, lints, and type-checks the project. Use `vp check --fix` for automatic fixes, path arguments for focused checks, and the full command for final verification.

Use `vp config` to generate commit hooks from the shared `staged` rules. Keep one `vite.config.ts` unless the project needs separate configurations.

## Configurations

- **`base`**: Strict TypeScript-first format, lint, type-aware/type-check defaults, dependency/build ignores, test include, and staged-file defaults.
- **`react`**: `base` plus browser globals, React lint rules, and Tailwind-aware formatting. React Native or Expo projects that want to reject DOM globals can override `lint.env.browser` to `false`.
- **`node`**: `base` plus Node-oriented lint rules.
- **`library`**: `base` plus ESM-only packaging defaults for `vp pack`.
- **`monorepo`**: `base` plus root-only `run` defaults for workspace caching.
- **`cloudflare-workers`**: `node` plus Cloudflare Worker test wiring.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
