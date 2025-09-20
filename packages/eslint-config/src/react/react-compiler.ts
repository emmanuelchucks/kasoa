import reactCompiler from "eslint-plugin-react-compiler";
import { defineConfig } from "eslint/config";

export const reactCompilerConfig = defineConfig(
  reactCompiler.configs.recommended,
);
