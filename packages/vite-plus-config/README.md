# @kasoa/vite-plus-config

Strict Vite+ presets for formatting, linting, type checking, testing, packaging, and staged checks. Requires Node.js 24.11 or newer, Vite+ 0.2.8 or newer, and TypeScript 7.

## Installation

```bash
pnpm add -D @kasoa/vite-plus-config vite-plus typescript@^7
```

## Presets

| Export               | Use                                             |
| -------------------- | ----------------------------------------------- |
| `base`               | TypeScript applications and custom compositions |
| `react`              | Browser React applications                      |
| `react-native`       | React Native and Expo applications              |
| `node`               | Node.js applications and tools                  |
| `library`            | ESM libraries built with `vp pack`              |
| `monorepo`           | Workspace roots using Vite+ tasks               |
| `cloudflare-workers` | Node preset plus workerd-based Vitest wiring    |

Create `vite.config.ts` with the matching factory:

```ts
import { createConfig } from "@kasoa/vite-plus-config/react";

export default createConfig();
```

### React Native and Expo

```ts
import { createConfig } from "@kasoa/vite-plus-config/react-native";

export default createConfig();
```

The native preset rejects DOM globals, permits Expo's statically replaced `process.env` and React Native's `__DEV__`, excludes DOM accessibility rules, and ignores `.expo` output. It does not ignore `android` or `ios`, which may be project-owned source.

### Cloudflare Workers tests

Install the optional peers:

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

Wrangler owns Worker development, builds, type generation, and deployment. Vite+ owns static checks and workerd tests. Consumers retain ownership of bindings, migrations, setup files, coverage, and `test.provide` values.

## Overrides

Pass project-specific overrides to the factory. Lint rule tuples are replaced atomically; other arrays follow Vite's merge behavior.

```ts
import { createConfig } from "@kasoa/vite-plus-config/react";

export default createConfig({
  lint: {
    rules: {
      complexity: "off",
      "max-params": ["warn", { max: 5 }],
    },
  },
  test: {
    coverage: {
      reporter: ["text", "html"],
    },
  },
});
```

The React presets report React Compiler violations, but linting does not install or enable compiler transforms. Configure the compiler separately in applications that use it.

## Commands

```bash
vp check
vp check --fix
vp test
```

Use path arguments for focused iteration and run the complete command before committing. Import Vitest APIs from `vite-plus/test`.

`vp config` generates commit hooks from the preset's staged-check configuration.

## License

MIT
