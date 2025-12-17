import type { Config } from "prettier";

export const react = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
