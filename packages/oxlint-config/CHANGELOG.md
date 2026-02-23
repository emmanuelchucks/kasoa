# @kasoa/oxlint-config

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
