# @kasoa/eslint-config

Kasoa's ESLint config

## Installation

Install ESLint and the config:

```bash
pnpm add -D @kasoa/eslint-config eslint
```

**Note**: Requires Node.js >=22 and a TypeScript setup.

## Usage

Import the desired config in your `eslint.config.ts` (using ESLint's flat config format). Extend it with project-specific overrides as needed.

### React Projects

For React applications with TypeScript:

```js
import { react } from "@kasoa/eslint-config/react";
import { defineConfig } from "eslint/config";

export default defineConfig(react, {
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      projectService: true,
    },
  },
});
```

### Node.js Projects

For Node.js backends or scripts:

```js
import { node } from "@kasoa/eslint-config/node";
import { defineConfig } from "eslint/config";

export default defineConfig(node, {
  // Add custom rules or overrides here
  rules: {
    "no-console": "warn",
  },
});
```

### Base Config

For minimal setups (e.g., libraries or custom extensions):

```js
import { base } from "@kasoa/eslint-config/base";
import { defineConfig } from "eslint/config";

export default defineConfig(base, {
  // Customize as needed
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
