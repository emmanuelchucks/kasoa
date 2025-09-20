import { defineConfig } from "eslint/config";
import { base } from "../base/index.js";
import { eslintReactConfig } from "./eslint-react.js";
import { jsxA11yXConfig } from "./jsx-a11y-x.js";
import { reactCompilerConfig } from "./react-compiler.js";
import { reactHooksConfig } from "./react-hooks.js";
import { reactRefreshConfig } from "./react-refresh.js";

export const react = defineConfig(
  base,
  eslintReactConfig,
  jsxA11yXConfig,
  reactHooksConfig,
  reactRefreshConfig,
  reactCompilerConfig,
);
