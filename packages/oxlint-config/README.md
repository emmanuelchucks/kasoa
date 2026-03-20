# @kasoa/oxlint-config

Kasoa's Oxlint config

## Installation

Install Oxlint, type-aware linting support, and the config:

```bash
pnpm add -D @kasoa/oxlint-config oxlint oxlint-tsgolint
```

**Note**: Requires Node.js >=24 and a TypeScript setup.

## Usage

Import the desired config in your `oxlint.config.ts`. Extend it with project-specific overrides as needed.
The shared presets are strict by default and designed for TypeScript-first projects.

### React Projects

```ts
export { react as default } from "@kasoa/oxlint-config/react";
```

### Server Projects

```ts
export { server as default } from "@kasoa/oxlint-config/server";
```

This preset is intended for server-side runtimes such as Node.js, Bun, and Workers-style server code.

### Base Config

```ts
export { base as default } from "@kasoa/oxlint-config/base";
```

### Custom Overrides

Use `defineConfig` to add project-specific rules:

```ts
import { server } from "@kasoa/oxlint-config/server";
import { defineConfig } from "oxlint";

export default defineConfig({
  ...server,
  rules: {
    ...server.rules,
    "no-console": "warn",
  },
});
```

## Suggested Scripts

Type-aware linting is expected by default:

```json
{
  "scripts": {
    "lint": "oxlint --fix .",
    "format": "oxfmt ."
  }
}
```

## Configurations

- **`base`**: Core rules for TypeScript-first code quality, promise usage, import graph safety, and Vitest.
- **`server`**: Extends `base` with server-oriented lint rules.
- **`react`**: Extends `base` with React, React performance, and JSX a11y rules.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
