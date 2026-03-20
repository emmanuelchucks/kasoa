# @kasoa/oxfmt-config

Kasoa's Oxfmt configurations

## Installation

```bash
pnpm add -D @kasoa/oxfmt-config oxfmt
```

## Usage

Create a local `oxfmt.config.ts` and re-export the shared preset. Then run `oxfmt .` normally.

### Base Config

For general JavaScript/TypeScript projects:

```ts
export { base as default } from "@kasoa/oxfmt-config/base";
```

### React Config

For React applications:

```ts
export { react as default } from "@kasoa/oxfmt-config/react";
```

### Suggested Script

```json
{
  "scripts": {
    "format": "oxfmt ."
  }
}
```

## Configurations

- **`base`**: Core Oxfmt settings with import sorting groups.
- **`react`**: React-oriented Oxfmt settings that extend base.

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
