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

const parseEnv = defineEnv(
  v.object({
    DATABASE_URL: v.pipe(v.string(), v.url()),
    PORT: v.pipe(v.string(), v.transform(Number)),
    NODE_ENV: v.optional(v.picklist(["development", "production"]), "development"),
  }),
);

const env = parseEnv({
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
});

// env is fully typed:
// { DATABASE_URL: string; PORT: number; NODE_ENV: "development" | "production" }
```

## Features

- Works with any [Standard Schema](https://standardschema.dev/) compatible library (Valibot, Zod, ArkType, etc.)
- Treats empty strings as missing values
- Throws with formatted error messages listing all invalid variables
- Full TypeScript inference

## API

### `defineEnv(schema)`

Creates an env parser for the provided schema.

- `schema` - A Standard Schema compatible schema

Returns a function that accepts an env-like object and validates it.

```ts
const parseEnv = defineEnv(schema);
const env = parseEnv(envSource);
```

The parser input is derived from the schema's inferred object input type, while
still allowing extra runtime keys from env-like objects such as `process.env`
and Cloudflare Worker bindings.

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

## Runtime Notes

### Node.js

Pass `process.env` directly:

```ts
const parseEnv = defineEnv(schema);

const env = parseEnv(process.env);
```

### Expo / React Native

Pass an explicit object built from app code:

```ts
const parseEnv = defineEnv(schema);

const env = parseEnv({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});
```

### Cloudflare Workers

Pass the Worker bindings object directly:

```ts
import { env as cfEnv } from "cloudflare:workers";

const parseEnv = defineEnv(schema);

const env = parseEnv(cfEnv);
```
