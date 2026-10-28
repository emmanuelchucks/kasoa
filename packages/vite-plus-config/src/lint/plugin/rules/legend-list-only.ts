import type { ESTree } from "vite-plus/lint/plugins";
import { defineRule } from "vite-plus/lint/plugins";
import { keyName } from "../key-name.ts";

// The list engines React Native ships, and that Reanimated and Gesture Handler re-export (named, or
// on Reanimated's default `Animated` and React Native's `Animated`).
const engines = new Set(["FlatList", "SectionList", "VirtualizedList", "VirtualizedSectionList"]);
const owners = new Set(["react-native", "react-native-gesture-handler", "react-native-reanimated"]);

export const legendListOnly = defineRule({
  meta: {
    messages: {
      engine:
        "Every list of data is a Legend List (@legendapp/list): LegendList or AnimatedLegendList, or its SectionList for sections.",
    },
  },
  create(context) {
    /** Whether the name is bound to an import from a list engine's owner. */
    const fromOwner = (object: ESTree.Node) => {
      if (object.type !== "Identifier" && object.type !== "JSXIdentifier") return false;
      const variable = context.sourceCode
        .getScope(object)
        .references.find(({ identifier }) => identifier.start === object.start)?.resolved;
      const declaration = variable?.defs.find(({ type }) => type === "ImportBinding")?.parent;
      return declaration?.type === "ImportDeclaration" && owners.has(declaration.source.value);
    };
    return {
      ImportSpecifier(node) {
        const imported =
          node.imported.type === "Identifier" ? node.imported.name : node.imported.value;
        if (
          engines.has(imported) &&
          node.parent.type === "ImportDeclaration" &&
          owners.has(node.parent.source.value)
        ) {
          context.report({ node, messageId: "engine" });
        }
      },
      MemberExpression(node) {
        const name = keyName(node.property, node.computed);
        if (name !== undefined && engines.has(name) && fromOwner(node.object)) {
          context.report({ node, messageId: "engine" });
        }
      },
      JSXMemberExpression(node) {
        if (engines.has(node.property.name) && fromOwner(node.object)) {
          context.report({ node, messageId: "engine" });
        }
      },
    };
  },
});
