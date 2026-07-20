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
- Exposes structured validation issues with readable error messages
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

The parser input is derived from the schema's inferred object input type while still accepting extra runtime keys from env-like objects such as `process.env`. Whether a schema ignores or rejects those extra keys is determined by the schema library and schema configuration.

Throws an `EnvValidationError` if validation fails. The error extends `Error`, keeps the original Standard Schema issues on `error.issues`, and provides a readable message:

```
Environment validation failed:

  DATABASE_URL: Invalid URL
  PORT: Required
```

Async schemas are not supported and throw a `TypeError` instead.

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

Project the scalar configuration described by the schema and parse it when the configuration is accessed:

```ts
import { env as workerEnv } from "cloudflare:workers";

const parseEnv = defineEnv(schema);

export default {
  fetch() {
    const env = parseEnv({
      API_URL: workerEnv.API_URL,
      AUTH_SECRET: workerEnv.AUTH_SECRET,
    });

    return Response.json({ apiUrl: env.API_URL });
  },
};
```

Keep resource bindings such as D1, KV, R2, Durable Objects, Queues, and services on the generated `Cloudflare.Env` type. Do not cache parsed binding values in global scope because Cloudflare may reuse an isolate after binding changes.

With `nodejs_compat`, `process.env` is an alternative for string-oriented configuration:

```ts
const env = parseEnv(process.env);
```

This requires `nodejs_compat_populate_process_env`, enabled by default for compatibility dates on or after `2025-04-01`. Non-string JSON variables are JSON-encoded strings, and resource bindings are not included.
