# @kasoa/eslint-config

Kasoa's ESLint config

## Installation

Install ESLint and the config:

```bash
pnpm add -D @kasoa/eslint-config eslint
```

**Note**: Requires Node.js >=24 and a TypeScript setup.

## Usage

Import the desired config in your `eslint.config.ts` (using ESLint's flat config format). Extend it with project-specific overrides as needed.

### React Projects

```js
export { react as default } from "@kasoa/eslint-config/react";
```

### Node.js Projects

```js
export { node as default } from "@kasoa/eslint-config/node";
```

### Base Config

```js
export { base as default } from "@kasoa/eslint-config/base";
```

### Custom Overrides

Use `defineConfig` to add project-specific rules:

```js
import { node } from "@kasoa/eslint-config/node";
import { defineConfig } from "eslint/config";

export default defineConfig(node, {
  rules: {
    "no-console": "warn",
  },
});
```

## Configurations

- **`base`**: Core rules for TypeScript, imports, code quality, and testing.
- **`node`**: Extends `base` with Node.js-specific rules.
- **`react`**: Extends `base` with React-specific rules.

All configs use Prettier-compatible rules and enforce strict standards.

## Contributing

- Follow project conventions.
- Test changes in a sample project.
- Update this README for new configs.

## Author

Emmanuel Chucks [https://github.com/emmanuelchucks](https://github.com/emmanuelchucks)

## License

MIT
