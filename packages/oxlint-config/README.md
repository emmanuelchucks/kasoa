# @kasoa/oxlint-config

Kasoa's Oxlint config

## Installation

Install Oxlint, typed linting support, and the config:

```bash
pnpm add -D @kasoa/oxlint-config oxlint oxlint-tsgolint
```

**Note**: Requires Node.js >=24 and a TypeScript setup.

## Usage

Import the desired config in your `oxlint.config.ts`. Extend it with project-specific overrides as needed.

### React Projects

```ts
export { react as default } from "@kasoa/oxlint-config/react";
```

### Node.js Projects

```ts
export { node as default } from "@kasoa/oxlint-config/node";
```

### Base Config

```ts
export { base as default } from "@kasoa/oxlint-config/base";
```

### Custom Overrides

Use `defineConfig` to add project-specific rules:

```ts
import { node } from "@kasoa/oxlint-config/node";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...node,
  rules: {
    ...node.rules,
    "no-console": "warn",
  },
});
```

## Suggested Scripts

Type-aware linting is expected by default:

```json
{
  "scripts": {
    "lint": "oxlint --type-aware --fix .",
    "format": "oxfmt ."
  }
}
```

## Configurations

- **`base`**: Core rules for TypeScript-first code quality.
- **`node`**: Extends `base` with Node.js, import cycle, and test rules.
- **`react`**: Extends `base` with React, JSX a11y, import cycle, and test rules.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
