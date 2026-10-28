import type { ESTree } from "vite-plus/lint/plugins";
import { defineRule } from "vite-plus/lint/plugins";

const effects = new Set(["useEffect", "useLayoutEffect", "useInsertionEffect"]);
const hookName = /^use[A-Z0-9]/u;

/** The name a function is known by: its own, or the variable it's assigned to. */
function functionName(fn: ESTree.Node): string | undefined {
  if ((fn.type === "FunctionDeclaration" || fn.type === "FunctionExpression") && fn.id !== null) {
    return fn.id.name;
  }
  const { parent } = fn;
  return parent?.type === "VariableDeclarator" && parent.id.type === "Identifier"
    ? parent.id.name
    : undefined;
}

const isFunction = (node: ESTree.Node) =>
  node.type === "ArrowFunctionExpression" ||
  node.type === "FunctionExpression" ||
  node.type === "FunctionDeclaration";

// An effect syncs with a system outside React, and a hook named for that system owns it, so a
// component reads as what it renders ("You Might Not Need an Effect" on react.dev).
export const effectsInHooks = defineRule({
  meta: {
    messages: {
      effect:
        "Call {{name}} in a custom hook named for what it syncs with (`useSomething`), not in a component or plain function.",
    },
  },
  create(context) {
    /** The React effect this identifier names, when it's bound to an import from React. */
    const effectNamed = (identifier: ESTree.Node): string | undefined => {
      if (identifier.type !== "Identifier") return undefined;
      const variable = context.sourceCode
        .getScope(identifier)
        .references.find((reference) => reference.identifier === identifier)?.resolved;
      const definition = variable?.defs.find(({ type }) => type === "ImportBinding");
      if (definition?.parent?.type !== "ImportDeclaration") return undefined;
      if (definition.parent.source.value !== "react") return undefined;
      const { node } = definition;
      if (node.type !== "ImportSpecifier") return undefined;
      const imported =
        node.imported.type === "Identifier" ? node.imported.name : node.imported.value;
      return effects.has(imported) ? imported : undefined;
    };
    /** `React.useEffect`, where `React` is React's default or namespace import. */
    const memberEffect = (callee: ESTree.MemberExpression): string | undefined => {
      const { object, property } = callee;
      if (object.type !== "Identifier" || property.type !== "Identifier" || callee.computed) {
        return undefined;
      }
      if (!effects.has(property.name)) return undefined;
      const variable = context.sourceCode
        .getScope(object)
        .references.find((reference) => reference.identifier === object)?.resolved;
      const definition = variable?.defs.find(({ type }) => type === "ImportBinding");
      const fromReact =
        definition?.parent?.type === "ImportDeclaration" &&
        definition.parent.source.value === "react" &&
        definition.node.type !== "ImportSpecifier";
      return fromReact ? property.name : undefined;
    };
    return {
      CallExpression(call) {
        const name =
          call.callee.type === "MemberExpression"
            ? memberEffect(call.callee)
            : effectNamed(call.callee);
        if (name === undefined) return;
        let owner: ESTree.Node | null = call.parent;
        while (owner !== null && !isFunction(owner)) owner = owner.parent;
        const ownerName = owner === null ? undefined : functionName(owner);
        if (ownerName === undefined || !hookName.test(ownerName)) {
          context.report({ node: call, messageId: "effect", data: { name } });
        }
      },
    };
  },
});
