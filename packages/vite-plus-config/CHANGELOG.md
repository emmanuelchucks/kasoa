# @kasoa/vite-plus-config

## 0.0.11

### Patch Changes

- 093fa63: Remove the Cloudflare Worker `vitest` alias runtime assertion.

  The Worker preset still requires `vitest` to resolve to `@voidzero-dev/vite-plus-test`, but the package now leaves that as documented setup instead of enforcing it at runtime. This avoids false failures in monorepos where `process.cwd()` does not reliably identify the consumer package root.

## 0.0.10

### Patch Changes

- 1da3506: Simplify the public preset surface and tighten the Cloudflare Worker setup.
  - rename the `server` preset to `node`
  - remove the root package entrypoint and the `test/cloudflare-workers` public subpath
  - add a dedicated `cloudflare-workers` preset for Cloudflare Worker dev and test setup
  - require `vitest` to resolve to `@voidzero-dev/vite-plus-test` for Cloudflare Worker tests and fail early with a clear error when it does not

## 0.0.9

### Patch Changes

- Refactor the preset API to use subpath `createConfig(...)` factories as the single supported pattern.

  This release removes the old preset value exports such as `base`, `react`, `server`, `library`, and `monorepo`. Consumers should switch to the matching subpath factory instead, for example `@kasoa/vite-plus-config/react` with `createConfig(...)`.

  It also moves `pack.clean` into the shared library preset by default and keeps the Cloudflare Worker test helper available without reintroducing a second preset export style from the package root.

## 0.0.8

### Patch Changes

- Ignore migrations directories in the shared generated-file patterns for linting and formatting.

## 0.0.7

### Patch Changes

- Enforce explicit module boundary types in the shared lint preset and align the workspace on declaration-friendly exported public surfaces.

## 0.0.6

### Patch Changes

- Ignore common generated files like `worker-configuration.d.ts` and Drizzle output by default, and simplify the package internals so the shared configs are authored directly through Vite+.

## 0.0.5

### Patch Changes

- d52e8ce: Ignore common generated Cloudflare and Drizzle files in formatting and linting.

## 0.0.4

### Patch Changes

- f9011c1: Raise the shared `complexity` limit in the Vite+ preset from `10` to `20` to better fit real application components.

## 0.0.3

### Patch Changes

- 8cbc99a: Remove the `react-perf` plugin from the shared React presets to reduce noisy inline-prop findings in application code.

## 0.0.2

### Patch Changes

- 3a1d1dc: Add a new `@kasoa/vite-plus-config` package with strict Vite+ presets for base, React, server, library, monorepo, and optional Cloudflare Worker test wiring.

## 0.0.1

### Patch Changes

- Initial release with strict Vite+ presets for base, React, server, library, monorepo, and optional Cloudflare Worker test wiring.
