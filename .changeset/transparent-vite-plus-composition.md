---
"@kasoa/vite-plus-config": minor
---

Replace hierarchical preset factories with transparent Vite+ configuration fragments and correct runtime, test, and configuration-file boundaries.

All fragments now come from the package root:

- `base` → runtime-neutral `baseToolingConfig` plus the chosen runtime and test-lint fragments
- `node` → base, `nodeRuntimeConfig`, and `nodeTestLintConfig`
- `react` → base, `browserRuntimeConfig`, `reactCoreConfig`, `reactDomConfig`, and `nodeTestLintConfig`
- `react-native` → base, `reactCoreConfig`, `reactNativeRuntimeConfig`, `reactNativeGeneratedConfig`, and `nodeTestLintConfig`
- `library` → base, the chosen runtime and test fragments, and `libraryPackConfig`
- `monorepo` → base and `workspaceRunConfig`, with package runtimes expressed as root lint overrides using complete profiles such as `reactWebLint` and `reactNativeLint`; `RUNTIME_OVERRIDE_EXCLUDE_FILES` preserves narrower config, CommonJS, and test boundaries

The Cloudflare subpath now exports only `createCloudflareTestConfig()`. Compose it with the root Worker runtime, generated-output, and test-lint fragments. Pass former `config` contents as an ordinary final fragment, move `test` to that fragment's `test` field, and move `include` to `test.include`.

Test discovery now uses Vite+/Vitest defaults. Consumers that require the former TypeScript-only scope can set `test.include` to `["**/*.{test,spec}.{ts,tsx,mts,cts}"]` in their final fragment.

The Node profile no longer enables `node/callback-return`, which incorrectly reports modern promise code that accepts callbacks without delegating completion to them.
