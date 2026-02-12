# @kasoa/oxfmt-config

Kasoa's Oxfmt configurations

## Installation

```bash
pnpm add -D @kasoa/oxfmt-config oxfmt
```

## Usage

Oxfmt uses JSON config files. Point Oxfmt to the shared config via `-c`.

### Base Config

For general JavaScript/TypeScript projects:

```json
{
  "scripts": {
    "format": "oxfmt -c ./node_modules/@kasoa/oxfmt-config/configs/base.json ."
  }
}
```

### React Config

For React applications:

```json
{
  "scripts": {
    "format": "oxfmt -c ./node_modules/@kasoa/oxfmt-config/configs/react.json ."
  }
}
```

## Configurations

- **`base`**: Core Oxfmt settings with import sorting groups.
- **`react`**: React-oriented Oxfmt settings (currently aligned with base).

## Author

Emmanuel Chucks  
https://github.com/emmanuelchucks

## License

MIT
