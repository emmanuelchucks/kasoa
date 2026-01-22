export type RuleSeverity = "off" | "warn" | "error";

export type RuleConfig = RuleSeverity | [RuleSeverity, Record<string, unknown>];

export type Rules = Record<string, RuleConfig>;

export type CategorySeverity = "off" | "warn" | "error";

export interface Categories {
  correctness?: CategorySeverity;
  suspicious?: CategorySeverity;
  pedantic?: CategorySeverity;
  perf?: CategorySeverity;
  style?: CategorySeverity;
  restriction?: CategorySeverity;
  nursery?: CategorySeverity;
}

export type JsPluginConfig = string | { name: string; specifier: string };

export interface OxlintConfig {
  $schema?: string;
  extends?: string[];
  plugins?: string[];
  jsPlugins?: JsPluginConfig[];
  categories?: Categories;
  env?: Record<string, boolean>;
  globals?: Record<string, "readonly" | "writable" | "off">;
  settings?: Record<string, unknown>;
  rules?: Rules;
  overrides?: Array<{
    files: string[];
    rules?: Rules;
  }>;
}
