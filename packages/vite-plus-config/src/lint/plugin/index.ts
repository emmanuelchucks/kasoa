import type { Plugin } from "vite-plus/lint/plugins";
import { definePlugin } from "vite-plus/lint/plugins";
import { disableReason } from "./rules/disable-reason.ts";
import { effectsInHooks } from "./rules/effects-in-hooks.ts";
import { legendListOnly } from "./rules/legend-list-only.ts";
import { noDynamicImport } from "./rules/no-dynamic-import.ts";
import { noMappedScrollview } from "./rules/no-mapped-scrollview.ts";
import { noShadowedGlobals } from "./rules/no-shadowed-globals.ts";

const kasoaPlugin: Plugin = definePlugin({
  meta: { name: "kasoa" },
  rules: {
    "disable-reason": disableReason,
    "effects-in-hooks": effectsInHooks,
    "legend-list-only": legendListOnly,
    "no-dynamic-import": noDynamicImport,
    "no-mapped-scrollview": noMappedScrollview,
    "no-shadowed-globals": noShadowedGlobals,
  },
});

export default kasoaPlugin;
