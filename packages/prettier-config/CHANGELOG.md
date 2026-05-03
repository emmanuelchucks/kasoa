# @kasoa/prettier-config

## 0.0.15

### Patch Changes

- 47b2c68: Refresh shared tooling dependencies and adapt Vite+ config helpers for stricter readonly parameter checks without changing the object-based config API.

  Tighten the Prettier peer range for the Tailwind plugin update and keep ESLint as a development-only dependency in the Prettier config package.

## 0.0.14

### Patch Changes

- Pack the shared library packages through Vite+ end to end so builds, outputs, and package exports all follow the same unified toolchain.

## 0.0.8

### Patch Changes

- 95d5c35: Update dependencies and sync configurations

## 0.0.7

### Patch Changes

- 2ee3a9e: Bump patch versions for updated dependencies and config changes.

## 0.0.6

### Patch Changes

- f7a2ab7: Fix ESM compatibility by using import.meta.resolve with fileURLToPath

## 0.0.5

### Patch Changes

- c40390c: Use require.resolve for Tailwind plugin to ensure correct resolution in consumer projects

## 0.0.4

### Patch Changes

- ba12105: Use named export for react config to match base pattern

## 0.0.3

### Patch Changes

- 69b1639: Update dependencies to latest versions

## 0.0.2

### Patch Changes

- 2dbdca1: # @kasoa/eslint-config

  Replace eslint-plugin-jsx-a11y-x with official eslint-plugin-jsx-a11y and update dependencies

  # @kasoa/prettier-config

  Update ESLint and TypeScript preview dependencies

## 0.0.1

### Patch Changes

- a6e8992: Add Prettier config package with base and React presets; enhance ESLint config with React effect usage rules
