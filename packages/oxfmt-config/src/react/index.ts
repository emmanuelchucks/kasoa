import type { OxfmtConfig } from "../types";
import { baseConfig } from "../base/index";
import { tailwindcssConfig } from "./tailwindcss";

export const reactConfig: OxfmtConfig = {
  ...baseConfig,
  experimentalTailwindcss: tailwindcssConfig,
};
