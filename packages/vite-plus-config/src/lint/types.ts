import type { UserConfig } from "vite-plus";

export type LintConfig = NonNullable<UserConfig["lint"]>;
export type LintOverride = NonNullable<LintConfig["overrides"]>[number];
export type LintProfile = Omit<LintOverride, "excludeFiles" | "files">;
export type LintRules = NonNullable<LintConfig["rules"]>;
