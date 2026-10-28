# @kasoa/vite-plus-config

Strict, composable Vite+ configuration fragments. Requires Node.js 24.11+, Vite+ 1.4+ and TypeScript 7.

```bash
pnpm add -D @kasoa/vite-plus-config vite-plus typescript@^7
```

Each `*Config` export is a plain Vite+ config fragment, and each `*Lint` export is a plain Oxlint profile for `lint.overrides`. `composeConfig()` merges fragments left to right with Vite's `mergeConfig()` (arrays concatenate); call it once, in the final config.

## Node

```ts
import {
  baseToolingConfig,
  composeConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(baseToolingConfig, nodeRuntimeConfig, nodeTestLintConfig);
```

## React web

```ts
import {
  baseToolingConfig,
  browserRuntimeConfig,
  composeConfig,
  nodeTestLintConfig,
  reactCoreConfig,
  reactDomConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  browserRuntimeConfig,
  reactCoreConfig,
  reactDomConfig,
  nodeTestLintConfig,
);
```

Tests run in Node here. For DOM-emulated tests, compose `browserTestLintConfig` instead and set the matching Vitest environment.

The React fragments report React Compiler violations; they don't install or enable the compiler.

## React Native and Expo

```ts
import {
  baseToolingConfig,
  composeConfig,
  reactCoreConfig,
  reactNativeGeneratedConfig,
  reactNativeRuntimeConfig,
  reactNativeTestLintConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  reactCoreConfig,
  reactNativeRuntimeConfig,
  reactNativeGeneratedConfig,
  reactNativeTestLintConfig,
);
```

- `*.native.test.*` and `*.native.spec.*` files are Jest tests; other test files are Vitest tests, which may mock modules with `vi.mock`, by name or by `import()`, because Node can't load native modules.
- The runtime rules follow Hermes, so APIs it lacks (`toSorted()`, `Temporal`, some `Intl` formatters) are errors.
- Mapping data inside a `ScrollView` is an error unless the data is a module-level constant. To allow constants imported from your own modules, name them: `"kasoa/no-mapped-scrollview": ["error", { constantModules: ["/contracts$"] }]`.

## Workspaces

Vite+ applies the root lint config to the whole workspace, so give each package its runtime with a profile in a root override:

```ts
import {
  RUNTIME_OVERRIDE_EXCLUDE_FILES,
  TEST_FILES,
  baseToolingConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerLint,
  composeConfig,
  nodeTestLintConfig,
  reactNativeGeneratedConfig,
  reactNativeLint,
  reactNativeTestLint,
  workspaceRunConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  reactNativeGeneratedConfig,
  cloudflareWorkerGeneratedConfig,
  nodeTestLintConfig,
  workspaceRunConfig,
  {
    lint: {
      overrides: [
        {
          files: ["apps/mobile/**"],
          excludeFiles: [...RUNTIME_OVERRIDE_EXCLUDE_FILES],
          ...reactNativeLint,
        },
        {
          files: TEST_FILES.map((pattern) => `apps/mobile/${pattern}`),
          ...reactNativeTestLint,
        },
        {
          files: ["apps/server/**"],
          excludeFiles: [...RUNTIME_OVERRIDE_EXCLUDE_FILES],
          ...cloudflareWorkerLint,
        },
      ],
    },
  },
);
```

- `RUNTIME_OVERRIDE_EXCLUDE_FILES` keeps tests and config files out of a runtime override, so they keep their own rules. Config and CommonJS files always get the Node profile.
- `reactNativeLint` and `reactWebLint` cover a whole app; the narrower `reactCoreLint`, `reactDomLint` and `reactNativeRuntimeLint` are there when one part of a package needs only some of it.
- The same override pattern works in a single package with mixed runtimes, for example `{ files: ["scripts/**"], ...nodeLint }` in a Worker.

## Libraries

```ts
import {
  baseToolingConfig,
  composeConfig,
  libraryPackConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  nodeRuntimeConfig,
  nodeTestLintConfig,
  libraryPackConfig,
  {
    pack: { entry: { "src/index": "./src/index.ts" } },
  },
);
```

For several pack entries, spread `libraryPackDefaults` into each one instead of composing `libraryPackConfig`.

## Cloudflare Workers tests

```bash
pnpm add -D @cloudflare/vitest-plugin@^1.4
```

```ts
import {
  baseToolingConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerTestLintConfig,
  composeConfig,
} from "@kasoa/vite-plus-config";
import { createCloudflareTestConfig } from "@kasoa/vite-plus-config/cloudflare-workers";

export default composeConfig(
  baseToolingConfig,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerTestLintConfig,
  createCloudflareTestConfig(),
);
```

- `createCloudflareTestConfig()` takes the plugin's options. It reads `cloudflare.config.ts` when there is one (the `cf` CLI) and `wrangler.jsonc` otherwise; set `wrangler.configPath` to choose.
- With `cloudflare.config.ts`, the plugin renames the Worker under test, so a Durable Object binding that points back at the same Worker fails to start. Bind the class directly: `createCloudflareTestConfig({ miniflare: { durableObjects: { MY_OBJECT: "MyObject" } } })`.

## Kasoa rules

`baseToolingConfig` loads Kasoa's own Oxlint plugin. Its rules, configured like any other rule:

| Rule                         | Where                       | What it requires                                                                                                    |
| ---------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `kasoa/disable-reason`       | everywhere                  | every `oxlint-disable` or `eslint-disable` gives a reason after `--`, and a block `disable` has a matching `enable` |
| `kasoa/no-shadowed-globals`  | everywhere                  | no binding named after a language global such as `Symbol` or `Map`; browser and Node globals like `name` stay free  |
| `kasoa/effects-in-hooks`     | React                       | `useEffect`, `useLayoutEffect` and `useInsertionEffect` only inside functions named `use…`                          |
| `kasoa/legend-list-only`     | React Native                | lists of data use Legend List, not `FlatList`, `SectionList` or `VirtualizedList`                                   |
| `kasoa/no-mapped-scrollview` | React Native                | no mapping data to elements inside a `ScrollView`                                                                   |
| `kasoa/no-dynamic-import`    | React Native, outside tests | static imports only                                                                                                 |

## Changing a rule

A rule in a later fragment replaces the preset's setting for that rule:

```ts
export default composeConfig(baseToolingConfig, nodeRuntimeConfig, {
  lint: { rules: { "max-params": ["error", { max: 4 }] } },
});
```

To change a rule only in tests, build the test override yourself instead of composing the test fragment:

```ts
import type { ConfigFragment } from "@kasoa/vite-plus-config";
import { TEST_FILES, nodeTestLint } from "@kasoa/vite-plus-config";

const testLintConfig = {
  lint: {
    overrides: [
      {
        files: [...TEST_FILES],
        ...nodeTestLint,
        rules: { ...nodeTestLint.rules, "vitest/padding-around-test-blocks": "off" },
      },
    ],
  },
} satisfies ConfigFragment;
```

## Commit hooks

`baseToolingConfig` sets up `vp staged` to run `vp check --fix` on code and `vp fmt --write` on other files. Commit a `.vite-hooks/pre-commit` containing `vp staged`, then run `vp config --no-agent` to install the hook. Import Vitest APIs from `vite-plus/test`.

## License

MIT
