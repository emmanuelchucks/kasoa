import type { Config } from "prettier";

export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["/.*ClassName/"],
  tailwindFunctions: ["tv"],
} satisfies Config;
