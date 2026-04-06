import { defineConfig } from "@eslint/config-helpers";
import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";

export const reactYouMightNotNeedAnEffectConfig: ReturnType<typeof defineConfig> = defineConfig({
  ...reactYouMightNotNeedAnEffect.configs.recommended,
  files: ["**/*.{js,jsx,ts,tsx}"],
});
