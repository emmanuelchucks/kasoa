import type { OxlintConfig } from "../types.ts";
import { eslintReactPlugin } from "./eslint-react.ts";
import { jsxA11yPlugin } from "./jsx-a11y.ts";
import { perfectionistJsxRules } from "./perfectionist.ts";
import { reactCompilerPlugin } from "./react-compiler.ts";
import { reactPerfPlugin } from "./react-perf.ts";
import { reactYouMightNotNeedAnEffectPlugin } from "./react-you-might-not-need-an-effect.ts";
import { reactPlugin, reactRules } from "./react.ts";

export const reactConfig: OxlintConfig = {
  $schema: "./node_modules/oxlint/configuration_schema.json",
  extends: ["./base.json"],
  plugins: [reactPlugin, reactPerfPlugin, jsxA11yPlugin],
  jsPlugins: [
    reactCompilerPlugin,
    eslintReactPlugin,
    reactYouMightNotNeedAnEffectPlugin,
  ],
  rules: {
    ...reactRules,
    ...perfectionistJsxRules,
  },
};
