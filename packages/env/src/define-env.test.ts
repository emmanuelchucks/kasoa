import * as v from "valibot";
import { describe, expect, it } from "vitest";
import { defineEnv } from "./index.js";

describe("defineEnv()", () => {
  it("returns validated env object", () => {
    expect.assertions(1);

    const schema = v.object({
      DATABASE_URL: v.string(),
      PORT: v.pipe(v.string(), v.toNumber()),
    });

    const env = defineEnv(schema, {
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

    expect(() => defineEnv(schema, {})).toThrowError(
      "Environment validation failed",
    );
    expect(() => defineEnv(schema, {})).toThrowError("DATABASE_URL");
  });

  it("treats empty string as undefined", () => {
    expect.assertions(1);

    const schema = v.object({
      API_KEY: v.string(),
    });

    expect(() => defineEnv(schema, { API_KEY: "" })).toThrowError(
      "Environment validation failed",
    );
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

    expect(() => defineEnv(schema, { DATABASE_URL: "not-a-url" })).toThrowError(
      "DATABASE_URL",
    );
  });

  it("throws TypeError for async schemas", () => {
    expect.assertions(2);

    const asyncSchema = {
      "~standard": {
        version: 1 as const,
        vendor: "test",
        validate: () => Promise.resolve({ value: {} }),
      },
    };

    expect(() => defineEnv(asyncSchema, {})).toThrowError(TypeError);
    expect(() => defineEnv(asyncSchema, {})).toThrowError(
      "Async schema validation is not supported",
    );
  });

  it("uses process.env by default", () => {
    expect.assertions(1);

    const originalEnv = process.env.TEST_VAR;
    process.env.TEST_VAR = "test-value";

    try {
      const schema = v.object({
        TEST_VAR: v.string(),
      });

      const env = defineEnv(schema);

      expect(env.TEST_VAR).toBe("test-value");
    } finally {
      if (originalEnv === undefined) {
        delete process.env.TEST_VAR;
      } else {
        process.env.TEST_VAR = originalEnv;
      }
    }
  });
});
