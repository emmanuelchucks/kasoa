import { defineConfig } from "eslint/config";
import { base } from "../base/index.ts";
import { perfectionistJsxConfig } from "../base/perfectionist.ts";
import { eslintReactConfig } from "./eslint-react.ts";
import { jsxA11yConfig } from "./jsx-a11y.ts";
import { reactHooksConfig } from "./react-hooks.ts";
import { reactRefreshConfig } from "./react-refresh.ts";
import { reactYouMightNotNeedAnEffectConfig } from "./react-you-might-not-need-an-effect.ts";

export const react = defineConfig(
  base,
  eslintReactConfig,
  jsxA11yConfig,
  reactHooksConfig,
  reactRefreshConfig,
  reactYouMightNotNeedAnEffectConfig,
  perfectionistJsxConfig,
);
