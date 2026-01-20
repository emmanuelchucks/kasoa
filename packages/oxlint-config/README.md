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


## Usage

### JSON Configs

Create an `.oxlintrc.json` in your project root:

```json
{
  "$schema": "https://unpkg.com/oxlint/configuration_schema.json",
  "extends": ["./node_modules/@kasoa/oxlint-config/dist/base.json"]
}
```

Available configs:

- `base.json` - Core rules for all projects
- `node.json` - Node.js specific rules (extends base)
- `react.json` - React specific rules (extends base)

### JS Plugins

For ESLint plugins that OXLint doesn't natively support, import the plugin wrappers:

```javascript
// eslint.config.js (for hybrid ESLint + OXLint setup)
import sonarjs from "@kasoa/oxlint-config/plugins/sonarjs";
import perfectionist from "@kasoa/oxlint-config/plugins/perfectionist";
```

Available plugins:

- `plugins/sonarjs` - Code quality and cognitive complexity
- `plugins/perfectionist` - Sorting rules for interfaces, objects, JSX
- `plugins/react-compiler` - React 19+ compiler compatibility
- `plugins/react-you-might-not-need-an-effect` - useEffect anti-patterns
- `plugins/eslint-react` - Enhanced React rules
- `plugins/vitest` - Comprehensive test rules

## Exports

| Export                                         | Description                    |
| ---------------------------------------------- | ------------------------------ |
| `./base`                                       | Base OXLint JSON config        |
| `./node`                                       | Node.js OXLint JSON config     |
| `./react`                                      | React OXLint JSON config       |
| `./plugins/sonarjs`                            | SonarJS ESLint plugin          |
| `./plugins/perfectionist`                      | Perfectionist ESLint plugin    |
| `./plugins/react-compiler`                     | React Compiler ESLint plugin   |
| `./plugins/react-you-might-not-need-an-effect` | useEffect anti-patterns plugin |
| `./plugins/eslint-react`                       | @eslint-react ESLint plugin    |
| `./plugins/vitest`                             | Vitest ESLint plugin           |
