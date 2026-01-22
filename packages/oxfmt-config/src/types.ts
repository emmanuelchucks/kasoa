export interface SortImportsConfig {
  internalPattern?: string[];
  newlinesBetween?: boolean;
  groups?: (string | string[])[];
}

export interface TailwindcssConfig {
  attributes?: string[];
  functions?: string[];
}

export interface OxfmtConfig {
  $schema?: string;
  experimentalSortImports?: SortImportsConfig;
  experimentalTailwindcss?: TailwindcssConfig;
}
