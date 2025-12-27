import reactCompiler from "eslint-plugin-react-compiler";
import { defineConfig } from "eslint/config";

export const reactCompilerConfig = defineConfig({
  files: ["**/*.{js,jsx,ts,tsx}"],
  extends: [reactCompiler.configs.recommended],
});
