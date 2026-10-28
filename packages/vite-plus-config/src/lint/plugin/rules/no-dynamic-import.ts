import { defineRule } from "vite-plus/lint/plugins";

// Metro's native builds and Wrangler put every module in one bundle, so a dynamic import splits
// nothing there, and it hides what's imported from the import rules.
export const noDynamicImport = defineRule({
  meta: { messages: { dynamic: "Import statically, so the import rules see what's imported." } },
  create(context) {
    return {
      ImportExpression(node) {
        context.report({ node, messageId: "dynamic" });
      },
    };
  },
});
