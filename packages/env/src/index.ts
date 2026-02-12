import type { StandardSchemaV1 } from "@standard-schema/spec";

export type InferEnv<T extends StandardSchemaV1> = StandardSchemaV1.InferOutput<T>;

export function defineEnv<T extends StandardSchemaV1>(
  schema: T,
  env: Record<string, string | undefined> = process.env,
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

function normalizeEnv(env: Record<string, string | undefined>): Record<string, string | undefined> {
  const normalizedEnv: Record<string, string | undefined> = {};
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
