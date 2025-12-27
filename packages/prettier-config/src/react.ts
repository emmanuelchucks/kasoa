import type { Config } from "prettier";
import { fileURLToPath } from "node:url";

export const react = {
  plugins: [fileURLToPath(import.meta.resolve("prettier-plugin-tailwindcss"))],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
