import type { StandardSchemaV1 } from "@standard-schema/spec";

type EnvSchema = StandardSchemaV1<object, unknown>;
type KnownEnvSource<T extends EnvSchema> = Readonly<Partial<StandardSchemaV1.InferInput<T>>> &
  object;
type OpenEnvSource<T extends EnvSchema> = Readonly<Partial<StandardSchemaV1.InferInput<T>>> &
  Readonly<Record<string, unknown>>;

export type InferEnv<T extends StandardSchemaV1> = StandardSchemaV1.InferOutput<T>;
export type EnvSource<T extends EnvSchema> = KnownEnvSource<T> | OpenEnvSource<T>;

export class EnvValidationError extends Error {
  readonly issues: readonly StandardSchemaV1.Issue[];

  constructor(issues: readonly StandardSchemaV1.Issue[]) {
    super(formatIssues(issues));
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

export function defineEnv<T extends EnvSchema>(schema: T, env: EnvSource<T>): InferEnv<T> {
  const normalizedEnv = normalizeEnv(env);
  const result = schema["~standard"].validate(normalizedEnv);

  if (result instanceof Promise) {
    throw new TypeError("Async schema validation is not supported");
  }

  if (result.issues) {
    throw new EnvValidationError(result.issues);
  }

  return result.value;
}

function normalizeEnv(env: object): Record<string, unknown> {
  const normalizedEnv: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(env)) {
    normalizedEnv[key] = value === "" ? undefined : value;
  }
  return normalizedEnv;
}

function formatIssues(issues: readonly StandardSchemaV1.Issue[]): string {
  const lines = issues.map((issue) => `  ${getPathString(issue.path)}: ${issue.message}`);

  return `Environment validation failed:\n\n${lines.join("\n")}`;
}

function getPathString(
  path: readonly (PropertyKey | StandardSchemaV1.PathSegment)[] | undefined,
): string {
  if (path === undefined || path.length === 0) {
    return "root";
  }

  return path
    .map((segment) => String(typeof segment === "object" ? segment.key : segment))
    .join(".");
}
