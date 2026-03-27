# @kasoa/vite-plus-config

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
