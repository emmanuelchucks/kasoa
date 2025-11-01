import type { Config } from "prettier";
import { base } from "./base.js";

export const react = {
  plugins: [...base.plugins, "prettier-plugin-tailwindcss"],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
