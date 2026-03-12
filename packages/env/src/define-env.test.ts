import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { defineEnv } from "./index.ts";

describe("defineEnv()", () => {
  it("returns a parser that validates an env object", () => {
    expect.assertions(2);

    const parseEnv = defineEnv(createDatabaseSchema());
    const env = parseEnv({
      DATABASE_URL: "postgres://localhost",
      PORT: "3000",
    });

    expect(parseEnv).toBeTypeOf("function");
    expect(env).toStrictEqual({
      DATABASE_URL: "postgres://localhost",
      PORT: 3000,
    });
  });

  it("throws on missing required variable", () => {
    expect.assertions(2);

    const schema = v.object({
      DATABASE_URL: v.string(),
    });
    const parseEnv = defineEnv(schema);

    expect(() => parseEnv({})).toThrowError("Environment validation failed");
    expect(() => parseEnv({})).toThrowError("DATABASE_URL");
  });

  it("treats empty string as undefined", () => {
    expect.assertions(1);

    const schema = v.object({
      API_KEY: v.string(),
    });
    const parseEnv = defineEnv(schema);

    expect(() => parseEnv({ API_KEY: "" })).toThrowError("Environment validation failed");
  });

  it("supports optional variables with defaults", () => {
    expect.assertions(1);

    const schema = v.object({
      PORT: v.optional(v.string(), "3000"),
    });
    const parseEnv = defineEnv(schema);

    const env = parseEnv({});

    expect(env.PORT).toBe("3000");
  });

  it("validates nested paths correctly", () => {
    expect.assertions(1);

    const schema = v.object({
      DATABASE_URL: v.pipe(v.string(), v.url()),
    });
    const parseEnv = defineEnv(schema);

    expect(() => parseEnv({ DATABASE_URL: "not-a-url" })).toThrowError("DATABASE_URL");
  });

  it("accepts env sources with non-string bindings", () => {
    expect.assertions(1);

    const schema = v.object({
      API_URL: v.string(),
    });
    const parseEnv = defineEnv(schema);

    const env = parseEnv({
      API_URL: "https://api.kasoa.dev",
      KV: { name: "cache" },
    });

    expect(env.API_URL).toBe("https://api.kasoa.dev");
  });

  it("throws TypeError for async schemas", () => {
    expect.assertions(2);

    const parseEnv = defineEnv(createAsyncSchema());

    expect(() => parseEnv({})).toThrowError(TypeError);
    expect(() => parseEnv({})).toThrowError("Async schema validation is not supported");
  });

  it("rejects non-object schemas at the type level", () => {
    expect.assertions(0);

    // @ts-expect-error: env validation requires an object-input schema
    defineEnv(v.string());
  });
});

function createDatabaseSchema() {
  return v.object({
    DATABASE_URL: v.string(),
    PORT: v.pipe(v.string(), v.toNumber()),
  });
}

function createAsyncSchema() {
  return {
    "~standard": {
      vendor: "test",
      version: 1 as const,
      validate: async () => {
        const result = await Promise.resolve({ value: {} });
        return result;
      },
    },
  };
}
