# @kasoa/env

Type-safe environment variable validation using [Standard Schema](https://standardschema.dev/).

## Installation

```bash
pnpm add @kasoa/env valibot
```

## Usage

```ts
import { defineEnv } from "@kasoa/env";
import * as v from "valibot";

const env = defineEnv(
  v.object({
    DATABASE_URL: v.pipe(v.string(), v.url()),
    PORT: v.pipe(v.string(), v.transform(Number)),
    NODE_ENV: v.optional(
      v.picklist(["development", "production"]),
      "development",
    ),
  }),
);

// env is fully typed:
// { DATABASE_URL: string; PORT: number; NODE_ENV: "development" | "production" }
```

## Features

- Works with any [Standard Schema](https://standardschema.dev/) compatible library (Valibot, Zod, ArkType, etc.)
- Treats empty strings as missing values
- Throws with formatted error messages listing all invalid variables
- Full TypeScript inference

## API

### `defineEnv(schema, env?)`

Validates environment variables against the provided schema.

- `schema` - A Standard Schema compatible schema
- `env` - Optional env object (defaults to `process.env`)

Returns the validated and typed environment object.

Throws an `Error` if validation fails:

```
Environment validation failed:

  DATABASE_URL: Invalid URL
  PORT: Required
```

### `InferEnv<T>`

Type helper to infer the output type of a schema:

```ts
import type { InferEnv } from "@kasoa/env";

const schema = v.object({ PORT: v.string() });
type Env = InferEnv<typeof schema>;
// { PORT: string }
```
