# @kasoa/oxfmt-config

Shareable Oxfmt configurations with a CLI for easy setup.

## Installation

```bash
pnpm add -D @kasoa/oxfmt-config
```

## Usage

### CLI (Recommended)

Generate an `.oxfmtrc.json` in your project:

```bash
# Base config (import sorting)
npx @kasoa/oxfmt-config init

# React config (import sorting + Tailwind CSS class sorting)
npx @kasoa/oxfmt-config init --react
```

### Manual Import

You can also import the JSON configs directly:

```json
{
  "$schema": "https://unpkg.com/oxfmt/configuration_schema.json",
  "experimentalSortImports": {
    "internalPattern": ["#", "#/**"],
    "newlinesBetween": false,
    "groups": [
      "type",
      ["type-parent", "type-sibling", "type-index", "type-internal"],
      "builtin",
      "external",
      "internal",
      ["parent", "sibling", "index"],
      "side-effect",
      "unknown"
    ]
  }
}
```

## Exports

| Export    | Description                                            |
| --------- | ------------------------------------------------------ |
| `./base`  | Base Oxfmt JSON config with import sorting             |
| `./react` | React Oxfmt JSON config with import + Tailwind sorting |

## Features

- **Import Sorting**: Organizes imports by type, then by source
- **Tailwind Sorting** (React): Sorts Tailwind CSS classes in `className` and similar attributes
- **Internal Pattern**: Treats `#` imports (Node.js subpath imports) as internal
