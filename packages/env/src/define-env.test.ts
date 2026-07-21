import type { StandardSchemaV1 } from "@standard-schema/spec";
import * as v from "valibot";
import { describe, expect, it } from "vite-plus/test";
import { defineEnv, EnvValidationError } from "./index.ts";

describe("defineEnv()", () => {
  it("validates an env object directly", () => {
    expect.assertions(1);

    const env = defineEnv(createDatabaseSchema(), {
      DATABASE_URL: "postgres://localhost",
      PORT: "3000",
    });

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

    expect(() => defineEnv(schema, {})).toThrow("Environment validation failed");
    expect(() => defineEnv(schema, {})).toThrow("DATABASE_URL");
  });

  it("exposes validation issues and labels whole-object failures", () => {
    expect.assertions(5);

    const issues = [{ message: "Invalid environment", path: [] }] as const;

    try {
      defineEnv(createFailingSchema(issues), {});
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
    const defineInvalidEnv = () => defineEnv(createFailingSchema(issues), {});

    expect(defineInvalidEnv).toThrow(EnvValidationError);
    expect(defineInvalidEnv).toThrow("Symbol(API_KEY): Invalid value");
  });

  it("treats empty string as undefined", () => {
    expect.assertions(1);

    const schema = v.object({
      API_KEY: v.string(),
    });

    expect(() => defineEnv(schema, { API_KEY: "" })).toThrow("Environment validation failed");
  });

  it("supports optional variables with defaults", () => {
    expect.assertions(1);

    const schema = v.object({
      PORT: v.optional(v.string(), "3000"),
    });
    const env = defineEnv(schema, {});

    expect(env.PORT).toBe("3000");
  });

  it("validates nested paths correctly", () => {
    expect.assertions(1);

    const schema = v.object({
      DATABASE_URL: v.pipe(v.string(), v.url()),
    });

    expect(() => defineEnv(schema, { DATABASE_URL: "not-a-url" })).toThrow("DATABASE_URL");
  });

  it("accepts generated platform interfaces with non-string bindings", () => {
    expect.assertions(1);

    interface WorkerEnv {
      API_URL: string;
      KV: { name: string };
    }

    const workerEnv: WorkerEnv = {
      API_URL: "https://api.kasoa.dev",
      KV: { name: "cache" },
    };
    const schema = v.object({
      API_URL: v.string(),
    });
    const env = defineEnv(schema, workerEnv);

    expect(env.API_URL).toBe("https://api.kasoa.dev");
  });

  it("accepts process-like interfaces and object literals with extra keys", () => {
    expect.assertions(2);

    type ProcessEnv = Readonly<Record<string, string | undefined>>;

    const processEnv: ProcessEnv = {};
    const schema = v.object({
      API_URL: v.optional(v.string(), "https://api.kasoa.dev"),
    });

    expect(defineEnv(schema, processEnv).API_URL).toBeTypeOf("string");
    expect(defineEnv(schema, { EXTRA: { binding: true } }).API_URL).toBeTypeOf("string");
  });

  it("checks known source property types", () => {
    expect.assertions(1);

    const schema = v.object({
      API_URL: v.string(),
    });
    const checkInvalidSource = () => {
      // @ts-expect-error: known source properties must match the schema input
      defineEnv(schema, { API_URL: 42 });
    };

    expect(checkInvalidSource).toBeTypeOf("function");
  });

  it("throws TypeError for async schemas", () => {
    expect.assertions(2);

    const defineAsyncEnv = () => defineEnv(createAsyncSchema(), {});

    expect(defineAsyncEnv).toThrow(TypeError);
    expect(defineAsyncEnv).toThrow("Async schema validation is not supported");
  });

  it("rejects non-object schemas at the type level", () => {
    expect.assertions(1);

    expect(checkInvalidSchema).toBeTypeOf("function");
  });
});

function checkInvalidSchema() {
  // @ts-expect-error: env validation requires an object-input schema
  defineEnv(v.string(), {});
}

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
