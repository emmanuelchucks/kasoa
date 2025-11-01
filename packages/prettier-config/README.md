# @kasoa/prettier-config

Kasoa's Prettier configurations

## Installation

```bash
pnpm add -D @kasoa/prettier-config prettier
```

## Usage

### Base Config

For general JavaScript/TypeScript projects:

**prettier.config.js:**

```js
import { base } from "@kasoa/prettier-config/base";

export default base;
```

### React Config

For React applications with Tailwind CSS support:

**prettier.config.js:**

```js
import { react } from "@kasoa/prettier-config/react";

export default react;
```

### Custom Overrides

```js
import { base } from "@kasoa/prettier-config/base";

export default {
  ...base,
  printWidth: 100,
};
```

## Configurations

- **`base`**: Core Prettier settings with oxc plugin
- **`react`**: Extends base with Tailwind CSS class sorting

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
