import type { Config } from "prettier";
import { base } from "./base.ts";

export const react = {
  ...base,
  plugins: [...base.plugins, "prettier-plugin-tailwindcss"],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
