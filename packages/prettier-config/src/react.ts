import type { Config } from "prettier";

export const react = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
