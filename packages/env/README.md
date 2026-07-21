# @kasoa/env

Type-safe environment variable validation using [Standard Schema](https://standardschema.dev/).

`@kasoa/env` is a small ESM-only parser. It validates values supplied by your application; loading `.env` files and exposing runtime configuration remain the responsibility of Node.js, Expo, Vite, Cloudflare, or the framework you use.

## Installation

```bash
pnpm add @kasoa/env valibot
```

Use any Standard Schema compatible library in place of Valibot.

## Usage

```ts
import { defineEnv } from "@kasoa/env";
import * as v from "valibot";

const schema = v.object({
  DATABASE_URL: v.pipe(v.string(), v.url()),
  PORT: v.pipe(v.string(), v.toNumber()),
  NODE_ENV: v.optional(v.picklist(["development", "production"]), "development"),
});

export const env = defineEnv(schema, process.env);

// env is fully typed:
// { DATABASE_URL: string; PORT: number; NODE_ENV: "development" | "production" }
```

## Features

- Works with any Standard Schema compatible library, including Valibot, Zod, and ArkType
- Accepts Node environment objects, Vite environment objects, Expo projections, and generated Cloudflare binding interfaces
- Treats empty strings as missing values so optional defaults work with entries such as `PORT=`
- Exposes structured validation issues with readable error messages
- Preserves schema input and output inference

## API

### `defineEnv(schema, source)`

Validates and transforms an environment-like object with a synchronous Standard Schema object schema.

```ts
const env = defineEnv(schema, source);
```

The source may omit required schema properties because missing environment variables must be detected at runtime. Known source properties are checked against the schema input type, while additional platform values are accepted. Whether the schema ignores or rejects additional keys is determined by the schema library and schema configuration.

Empty strings are normalized to `undefined` before validation. The package intentionally treats an unset variable and an empty variable as equivalent.

Throws an `EnvValidationError` when validation fails. The error extends `Error`, retains the original Standard Schema issues on `error.issues`, and provides a readable message:

```text
Environment validation failed:

  DATABASE_URL: Invalid URL
  PORT: Required
```

Async schemas are not supported and throw a `TypeError`.

### `InferEnv<T>`

Infers the output type of a schema:

```ts
import type { InferEnv } from "@kasoa/env";

const schema = v.object({ PORT: v.string() });
type Env = InferEnv<typeof schema>;
// { PORT: string }
```

### `EnvSource<T>`

Describes an environment-like input accepted by a schema. This is useful when exposing helpers around `defineEnv`:

```ts
import type { EnvSource } from "@kasoa/env";

function loadEnv(source: EnvSource<typeof schema>) {
  return defineEnv(schema, source);
}
```

## Runtime usage

### Node.js

Pass `process.env` directly. Use Node's `--env-file`, `process.loadEnvFile()`, or your application's existing loader when `.env` file loading is needed.

```ts
export const env = defineEnv(schema, process.env);
```

A strict object schema will reject unrelated `process.env` entries. Use a normal object schema that discards unknown keys, or pass an explicit projection when strict validation is intentional.

### Vite

Vite exposes client variables through `import.meta.env`. Only variables allowed by Vite's prefix configuration, normally `VITE_`, are exposed to client code.

```ts
const schema = v.object({
  VITE_API_URL: v.pipe(v.string(), v.url()),
});

export const env = defineEnv(schema, import.meta.env);
```

Vite replaces these values in the client bundle. Calling `defineEnv` in application code validates when the application starts; it does not make `vite build` execute the generated client bundle.

### Expo / React Native

Expo only inlines statically referenced `EXPO_PUBLIC_` properties in application code. Pass an explicit object that uses dot notation:

```ts
const schema = v.object({
  EXPO_PUBLIC_API_URL: v.pipe(v.string(), v.url()),
});

export const env = defineEnv(schema, {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
});
```

Do not pass `process.env` as a whole, use computed property access, or place the environment references inside a dependency. Expo does not inline those forms. `EXPO_PUBLIC_` values are included in the application bundle and must not contain secrets.

Validation in application code occurs when the generated application bundle starts, not while `expo export` is producing it.

### Cloudflare Workers

Pass the generated Worker bindings interface when configuration is accessed:

```ts
const schema = v.object({
  API_URL: v.pipe(v.string(), v.url()),
  SETTINGS: v.object({
    region: v.string(),
    replicas: v.number(),
  }),
});

export default {
  fetch(_request, bindings) {
    const env = defineEnv(schema, bindings);

    return Response.json({ apiUrl: env.API_URL, region: env.SETTINGS.region });
  },
} satisfies ExportedHandler<Cloudflare.Env>;
```

Text, secret, and JSON variables can be validated. Keep resource bindings such as D1, KV, R2, Durable Objects, Queues, and services on the generated `Cloudflare.Env` type; `defineEnv` only returns the schema output.

Do not cache parsed binding values in global scope. Cloudflare may reuse an isolate after bindings change, so derive configuration when it is accessed. Strict object schemas require projecting only the configuration keys because resource bindings are additional properties.

With `nodejs_compat`, `process.env` is an alternative for string-oriented configuration. This requires `nodejs_compat_populate_process_env`, enabled by default for compatibility dates on or after `2025-04-01`. Non-string JSON variables are JSON-encoded strings and resource bindings are not included.

## Validation timing

`defineEnv` validates synchronously when it is called. This normally means Node.js startup, Vite or Expo application startup, or a Cloudflare request. It does not install build-tool hooks or load environment files. Build-time validation, when required, should call the same schema from the build configuration or CI boundary that owns those values.
