# @kasoa/oxlint-config

## 0.0.9

### Patch Changes

- Disable max-classes-per-file and new-cap rules, remove generated-file lint exemptions

## 0.0.8

### Patch Changes

- Rename the exported `node` preset to `server` and update the shared config exports accordingly.

## 0.0.7

### Patch Changes

- 15191e1: Migrate `@kasoa/oxfmt-config` to JS exports so consumers can re-export presets from a local `oxfmt.config.ts` instead of pointing at packaged JSON files.

  Tighten `@kasoa/oxlint-config` with stricter high-signal native rules and unused-disable reporting while avoiding the broader noise from the full restriction category.

## 0.0.6

### Patch Changes

- 8a3a84f: Require explicit env input in `@kasoa/env` and tighten the shared Oxlint presets with stricter native rules, type-aware defaults, and better test-file handling.

## 0.0.5

### Patch Changes

- 18579b1: Ignore legacy JavaScript config files (`*.config.js`, `*.config.cjs`, `*.config.mjs`) in shared Oxlint presets to reduce noise from Expo and tooling config files.

## 0.0.4

### Patch Changes

- c3c47ea: Widen peer dependency ranges to avoid false incompatibility warnings in consumer apps and align dependency versions across the workspace.

## 0.0.3

### Patch Changes

- 5121be8: Align configs with updated tooling and formatter behavior.

## 0.0.2

### Patch Changes

- Move Vitest plugin registration out of the base config and into runtime-specific configs.
  - remove `vitest` from `base` plugins
  - add `vitest` to `node` plugins
  - add `vitest` to `react` plugins to keep existing test rules working

## 0.0.1

### Patch Changes

- 7ef45bd: Add new Ox-native config packages for linting and formatting.
  - `@kasoa/oxlint-config`: shared Oxlint presets (`base`, `node`, `react`) with type-aware linting defaults.
  - `@kasoa/oxfmt-config`: shared Oxfmt JSON configs (`base`, `react`).
