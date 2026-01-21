# @kasoa/oxlint-config

Shareable OXLint configurations with JS plugin support for rules not natively available in OXLint.

## Installation

```bash
pnpm add -D @kasoa/oxlint-config oxlint
```

## Usage

Create an `.oxlintrc.json` file in your project root:

### Base Config (TypeScript/Node.js projects)

```json
{
  "extends": ["./node_modules/@kasoa/oxlint-config/dist/base.json"]
}
```

### React Config

```json
{
  "extends": ["./node_modules/@kasoa/oxlint-config/dist/react.json"]
}
```

### Node.js Config

```json
{
  "extends": ["./node_modules/@kasoa/oxlint-config/dist/node.json"]
}
```

## What's Included

### Base Config

- OXLint categories: correctness, suspicious, pedantic, perf
- Native plugins: import, promise
- JS plugins: perfectionist, vitest

### React Config

Extends base config and adds:

- Native plugins: react, react-perf, jsx-a11y
- JS plugins: react-compiler, react-you-might-not-need-an-effect, @eslint-react

### Node.js Config

Extends base config and adds:

- Native plugins: node

## Why Full Path?

OXLint doesn't yet support resolving `extends` from `node_modules` package names (see [oxc#18213](https://github.com/oxc-project/oxc/issues/18213)). The full path `./node_modules/@kasoa/oxlint-config/dist/...` is required until this feature is implemented.

The JS plugins are bundled as dependencies and resolve correctly from within this package.

## Note on JS Plugins

JS plugins are experimental in OXLint. The plugins use their default recommended configurations. To override specific rules, add them to your `.oxlintrc.json`:

```json
{
  "extends": ["./node_modules/@kasoa/oxlint-config/dist/base.json"],
  "rules": {
    "perfectionist/sort-imports": "off"
  }
}
```
