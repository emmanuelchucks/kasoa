# @kasoa/oxlint-config

Shareable OXLint configurations with JS plugin support for rules not natively available in OXLint.

## Installation

```bash
pnpm add -D @kasoa/oxlint-config oxlint
```

## CLI Usage

The package provides a CLI to generate configuration files since OXLint doesn't support extending from node_modules.

```bash
# Base config (Node.js projects)
npx @kasoa/oxlint-config
# or
npx oxlint-config

# React specific config
npx @kasoa/oxlint-config --react

# Node.js specific config
npx @kasoa/oxlint-config --node
```

### Generated Files

- `.oxlintrc.json` - Main config file
- `plugins/` - Directory with rule configs that extends from
