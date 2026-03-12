import type { StandardSchemaV1 } from "@standard-schema/spec";

type EnvInput = Record<string, unknown>;

export type InferEnv<T extends StandardSchemaV1> = StandardSchemaV1.InferOutput<T>;
export type EnvSource<T extends StandardSchemaV1<EnvInput, unknown>> = Readonly<
  EnvInput & Partial<StandardSchemaV1.InferInput<T>>
>;

export function defineEnv<T extends StandardSchemaV1<EnvInput, unknown>>(
  schema: T,
): (env: EnvSource<T>) => InferEnv<T> {
  return (env) => parseEnv(schema, env);
}

function parseEnv<T extends StandardSchemaV1<EnvInput, unknown>>(
  schema: T,
  env: EnvSource<T>,
): InferEnv<T> {
  const normalizedEnv = normalizeEnv(env);
  const result = schema["~standard"].validate(normalizedEnv);

  if (result instanceof Promise) {
    throw new TypeError("Async schema validation is not supported");
  }

  if (result.issues) {
    throw new Error(formatIssues(result.issues));
  }

  return result.value as InferEnv<T>;
}

function normalizeEnv(env: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const normalizedEnv: Record<string, unknown> = {};
  for (const key of Object.keys(env)) {
    const value = env[key];
    normalizedEnv[key] = value === "" ? undefined : value;
  }
  return normalizedEnv;
}

function formatIssues(issues: readonly StandardSchemaV1.Issue[]): string {
  const lines = issues.map((issue) => {
    const key = issue.path ? getPathString(issue.path) : "root";
    return `  ${key}: ${issue.message}`;
  });

  return `Environment validation failed:\n\n${lines.join("\n")}`;
}

function getPathString(path: readonly (PropertyKey | StandardSchemaV1.PathSegment)[]): string {
  return path.map((segment) => (typeof segment === "object" ? segment.key : segment)).join(".");
}
