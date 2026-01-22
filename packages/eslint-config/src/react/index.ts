import { defineConfig } from "eslint/config";
import { base } from "../base/index.js";
import { perfectionistJsxConfig } from "../base/perfectionist.js";
import { eslintReactConfig } from "./eslint-react.js";
import { jsxA11yConfig } from "./jsx-a11y.js";
import { reactHooksConfig } from "./react-hooks.js";
import { reactRefreshConfig } from "./react-refresh.js";
import { reactYouMightNotNeedAnEffectConfig } from "./react-you-might-not-need-an-effect.js";

export const react = defineConfig(
  base,
  eslintReactConfig,
  jsxA11yConfig,
  reactHooksConfig,
  reactRefreshConfig,
  reactYouMightNotNeedAnEffectConfig,
  perfectionistJsxConfig,
);
