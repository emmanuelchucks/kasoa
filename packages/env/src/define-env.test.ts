import type { StandardSchemaV1 } from "@standard-schema/spec";
import * as v from "valibot";
import { describe, expect, it } from "vite-plus/test";
import { defineEnv, EnvValidationError } from "./index.ts";

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

    expect(() => parseEnv({})).toThrow("Environment validation failed");
    expect(() => parseEnv({})).toThrow("DATABASE_URL");
  });

  it("exposes validation issues and labels whole-object failures", () => {
    expect.assertions(5);

    const issues = [{ message: "Invalid environment", path: [] }] as const;
    const parseEnv = defineEnv(createFailingSchema(issues));

    try {
      parseEnv({});
    } catch (error) {
      expect(error).toBeInstanceOf(EnvValidationError);

      if (!(error instanceof EnvValidationError)) {
        throw error;
      }

      expect(error.name).toBe("EnvValidationError");
      expect(error.issues).toBe(issues);
      expect(error.message).toContain("Environment validation failed");
      expect(error.message).toContain("root: Invalid environment");
    }
  });

  it("keeps symbol keys readable in validation errors", () => {
    expect.assertions(2);

    const issues = [{ message: "Invalid value", path: [Symbol("API_KEY")] }] as const;
    const parseEnv = defineEnv(createFailingSchema(issues));

    expect(() => parseEnv({})).toThrow(EnvValidationError);
    expect(() => parseEnv({})).toThrow("Symbol(API_KEY): Invalid value");
  });

  it("treats empty string as undefined", () => {
    expect.assertions(1);

    const schema = v.object({
      API_KEY: v.string(),
    });
    const parseEnv = defineEnv(schema);

    expect(() => parseEnv({ API_KEY: "" })).toThrow("Environment validation failed");
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

    expect(() => parseEnv({ DATABASE_URL: "not-a-url" })).toThrow("DATABASE_URL");
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

    expect(() => parseEnv({})).toThrow(TypeError);
    expect(() => parseEnv({})).toThrow("Async schema validation is not supported");
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

function createFailingSchema(
  issues: readonly StandardSchemaV1.Issue[],
): StandardSchemaV1<Record<string, unknown>, unknown> {
  return {
    "~standard": {
      vendor: "test",
      version: 1,
      validate: (_value: unknown) => ({ issues }),
    },
  };
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
