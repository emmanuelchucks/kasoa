import type { TailwindcssConfig } from "../types";

export const tailwindcssConfig: TailwindcssConfig = {
  attributes: ["class", "className", "/.*ClassName/"],
  functions: ["tv"],
};
