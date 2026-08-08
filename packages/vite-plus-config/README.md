# @kasoa/vite-plus-config

Strict, composable Vite+ configuration fragments. Requires Node.js 24.11 or newer, Vite+ 0.2.8 or newer, and TypeScript 7.

## Installation

```bash
pnpm add -D @kasoa/vite-plus-config vite-plus typescript@^7
```

The `*Config` exports are plain Vite+ configuration fragments; lint profiles, file patterns, and pack defaults are plain data. `composeConfig()` applies Vite's `mergeConfig()` from left to right and calls `defineConfig()` once. Arrays therefore retain Vite's normal concatenation behavior. Use it once at the final config boundary rather than nesting composed results. The separate Cloudflare export contains the only other function because its test plugin requires consumer options.

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

The source runtime and test runtime are independent. The example uses Vitest's default Node runtime. For DOM-emulated tests, compose `browserTestLintConfig` instead and configure the matching Vitest environment explicitly. Test discovery uses Vite+/Vitest defaults; set `test.include` in a final fragment when a project needs a narrower scope.

## React Native and Expo

```ts
import {
  baseToolingConfig,
  composeConfig,
  nodeTestLintConfig,
  reactCoreConfig,
  reactNativeGeneratedConfig,
  reactNativeRuntimeConfig,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  reactCoreConfig,
  reactNativeRuntimeConfig,
  reactNativeGeneratedConfig,
  nodeTestLintConfig,
);
```

The native fragment permits React Native's `__DEV__` and Expo's statically replaced `process.env`, rejects DOM and Worker globals, excludes DOM accessibility rules, and ignores `.expo` output.

## Libraries and workspaces

Packaging and workspace behavior are independent fragments:

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
    pack: {
      entry: {
        "src/index": "./src/index.ts",
      },
    },
  },
);
```

Use `workspaceRunConfig` at a workspace root. Vite+ applies the root lint configuration to workspace-wide checks, so model package runtimes with the exported lint profiles in root `lint.overrides`:

```ts
import {
  RUNTIME_OVERRIDE_EXCLUDE_FILES,
  baseToolingConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerLint,
  composeConfig,
  nodeTestLintConfig,
  reactNativeGeneratedConfig,
  reactNativeLint,
  reactWebLint,
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
          files: ["apps/server/**"],
          excludeFiles: [...RUNTIME_OVERRIDE_EXCLUDE_FILES],
          ...cloudflareWorkerLint,
        },
        {
          files: ["packages/web/**"],
          excludeFiles: [...RUNTIME_OVERRIDE_EXCLUDE_FILES],
          ...reactWebLint,
        },
      ],
    },
  },
);
```

`reactWebLint` and `reactNativeLint` are complete, plain Oxlint profiles for the common single-override case. Their lower-level runtime and React profiles remain available when a workspace needs separate scopes. Package configs still own local test, build, and pack wiring. For multiple pack operations, spread `libraryPackDefaults` into each entry instead of composing `libraryPackConfig` with a pack array.

## Mixed runtimes

The exported lint profiles are ordinary Oxlint override objects:

```ts
import {
  baseToolingConfig,
  cloudflareWorkerGeneratedConfig,
  cloudflareWorkerRuntimeConfig,
  composeConfig,
  nodeLint,
} from "@kasoa/vite-plus-config";

export default composeConfig(
  baseToolingConfig,
  cloudflareWorkerRuntimeConfig,
  cloudflareWorkerGeneratedConfig,
  {
    lint: {
      overrides: [
        {
          files: ["scripts/**", "evals/**"],
          ...nodeLint,
        },
      ],
    },
  },
);
```

Configuration and CommonJS files receive the Node profile from `baseToolingConfig` automatically. A broad workspace override should use `RUNTIME_OVERRIDE_EXCLUDE_FILES` so those files and tests remain under their narrower execution boundaries.

## Cloudflare Workers tests

Install the optional peers:

```bash
pnpm add -D @cloudflare/vitest-pool-workers wrangler
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
  createCloudflareTestConfig({
    miniflare: {
      bindings: {
        CORS_ALLOWED_ORIGINS: "",
      },
    },
  }),
  {
    test: {
      provide: {
        d1Migrations: [],
      },
    },
  },
);
```

Wrangler owns Worker development, builds, type generation, and deployment. Vite+ owns checks and workerd tests.

## Overrides

Preset rules are inherited through Oxlint, so an ordinary final rule replaces a preset tuple atomically:

```ts
import { baseToolingConfig, composeConfig, nodeRuntimeConfig } from "@kasoa/vite-plus-config";

export default composeConfig(baseToolingConfig, nodeRuntimeConfig, {
  lint: {
    rules: {
      complexity: "off",
      "max-params": ["warn", { max: 5 }],
    },
  },
});
```

To change a scoped test rule, construct that test fragment directly instead of composing the default one:

```ts
import type { ConfigFragment } from "@kasoa/vite-plus-config";
import { TEST_FILES, nodeTestLint } from "@kasoa/vite-plus-config";

const testLintConfig = {
  lint: {
    overrides: [
      {
        files: [...TEST_FILES],
        ...nodeTestLint,
        rules: {
          ...nodeTestLint.rules,
          "vitest/padding-around-test-blocks": "off",
        },
      },
    ],
  },
} satisfies ConfigFragment;
```

React fragments report React Compiler violations but do not install or enable compiler transforms.

## Commands

```bash
vp check
vp check --fix
vp test
```

Import Vitest APIs from `vite-plus/test`. Use `vp config` to generate commit hooks from the staged-check fragment.

## License

MIT
