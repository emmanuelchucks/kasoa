import reactYouMightNotNeedAnEffect from "eslint-plugin-react-you-might-not-need-an-effect";
import { defineConfig } from "eslint/config";

export const reactYouMightNotNeedAnEffectConfig = defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [reactYouMightNotNeedAnEffect.configs.recommended],
});
