import type { Context, ESTree } from "vite-plus/lint/plugins";
import { defineRule } from "vite-plus/lint/plugins";
import { keyName } from "../key-name.ts";

// React Native's scroll view, and the libraries' that wrap it, by the module each comes from.
const scrollViews = new Map([
  ["react-native", "ScrollView"],
  ["react-native-gesture-handler", "ScrollView"],
  ["react-native-keyboard-controller", "KeyboardAwareScrollView"],
]);

/** The `constantModules` option: modules whose exports are constants written in code. */
function constantModulesOf(options: unknown): RegExp[] {
  if (typeof options !== "object" || options === null || !("constantModules" in options)) return [];
  const { constantModules } = options;
  return Array.isArray(constantModules)
    ? constantModules
        .filter((pattern): pattern is string => typeof pattern === "string")
        .map((pattern) => new RegExp(pattern, "u"))
    : [];
}

const isNode = (value: unknown): value is ESTree.Node =>
  typeof value === "object" && value !== null && "type" in value && typeof value.type === "string";

/** Whether JSX is rendered anywhere in the node (a `.map` that renders, not one that computes). */
function rendersJsx(node: ESTree.Node): boolean {
  if (node.type === "JSXElement" || node.type === "JSXFragment") return true;
  return Object.entries(node).some(
    ([key, value]) =>
      key !== "parent" &&
      (Array.isArray(value) ? value : [value]).some((child) => isNode(child) && rendersJsx(child)),
  );
}

function mapped(call: ESTree.CallExpression) {
  const { callee } = call;
  const [callback] = call.arguments;
  const isMap =
    callee.type === "MemberExpression" && keyName(callee.property, callee.computed) === "map";
  return isMap && callback !== undefined && rendersJsx(callback) ? callee.object : undefined;
}

const isFunction = (node: ESTree.Node) =>
  node.type === "ArrowFunctionExpression" ||
  node.type === "FunctionExpression" ||
  node.type === "FunctionDeclaration";

function renderedAt(context: Context, fn: ESTree.Node) {
  const declared = fn.parent?.type === "VariableDeclarator" ? fn.parent : fn;
  return context.sourceCode
    .getDeclaredVariables(declared)
    .filter(({ defs }) => defs.every(({ type }) => type !== "Parameter"))
    .filter(({ name }) => /^[A-Z]/u.test(name))
    .flatMap(({ references }) => references)
    .flatMap(({ identifier }) => {
      const opening = identifier.parent;
      return opening.type === "JSXOpeningElement" && opening.parent.type === "JSXElement"
        ? [opening.parent]
        : [];
    });
}

/** Where a JSX element's name was imported from, and under what name, if it was imported. */
function importOf(context: Context, element: ESTree.JSXOpeningElement) {
  const { name } = element;
  const variable =
    name.type === "JSXIdentifier"
      ? context.sourceCode
          .getScope(element)
          .references.find(({ identifier }) => identifier.start === name.start)?.resolved
      : undefined;
  const definition = variable?.defs.find(({ type }) => type === "ImportBinding");
  const { node, parent } = definition ?? {};
  let imported = "default";
  if (node?.type === "ImportSpecifier") {
    imported = node.imported.type === "Identifier" ? node.imported.name : node.imported.value;
  }
  return parent?.type === "ImportDeclaration" ? { from: parent.source.value, imported } : undefined;
}

// A list of data is a virtualised list; a ScrollView holds content written in code. Rendering a
// constant written in code is that; rendering anything else (a query's rows, a prop, state),
// anywhere under the ScrollView, is a list of data.
export const noMappedScrollview = defineRule({
  meta: {
    defaultOptions: [{}],
    schema: [
      {
        type: "object",
        properties: { constantModules: { type: "array", items: { type: "string" } } },
        additionalProperties: false,
      },
    ],
    messages: {
      data: "This maps data inside a {{view}}. Use a Legend List, with the rest of the {{view}} as its ListHeaderComponent or ListFooterComponent.",
    },
  },
  create(context) {
    const constantModules = constantModulesOf(context.options[0]);
    const isConstant = (array: ESTree.Node) => {
      if (array.type !== "Identifier") return false;
      const variable = context.sourceCode
        .getScope(array)
        .references.find(({ identifier }) => identifier === array)?.resolved;
      const definition = variable?.defs[0];
      const declaration = definition?.parent;
      if (definition?.type === "ImportBinding") {
        return (
          declaration?.type === "ImportDeclaration" &&
          constantModules.some((pattern) => pattern.test(declaration.source.value))
        );
      }
      return (
        variable?.scope.type === "module" &&
        definition?.type === "Variable" &&
        declaration?.type === "VariableDeclaration" &&
        declaration.kind === "const"
      );
    };
    const readsOf = (declarator: ESTree.VariableDeclarator) =>
      context.sourceCode
        .getDeclaredVariables(declarator)
        .flatMap(({ references }) => references)
        .filter((reference) => reference.isRead())
        .map(({ identifier }) => identifier);
    /** The element's name, when it's a library's scroll view. */
    const scrollViewNamed = (element: ESTree.JSXElement) => {
      const origin = importOf(context, element.openingElement);
      return origin !== undefined && scrollViews.get(origin.from) === origin.imported
        ? origin.imported
        : undefined;
    };
    /** The scroll view this node is rendered in, through components written in this file. */
    const scrollViewAround = (node: ESTree.Node, seen: Set<ESTree.Node>): string | undefined => {
      for (let at = node.parent; at !== null; at = at.parent) {
        const view = at.type === "JSXElement" ? scrollViewNamed(at) : undefined;
        if (view !== undefined) return view;
        if (at.type === "VariableDeclarator" && !seen.has(at)) {
          seen.add(at);
          const renderedIn = readsOf(at)
            .map((identifier) => scrollViewAround(identifier, seen))
            .find((each) => each !== undefined);
          if (renderedIn !== undefined) return renderedIn;
        }
        if (isFunction(at) && !seen.has(at)) {
          seen.add(at);
          const renderedIn = renderedAt(context, at)
            .map((element) => scrollViewAround(element, seen))
            .find((each) => each !== undefined);
          if (renderedIn !== undefined) return renderedIn;
        }
      }
      return undefined;
    };
    return {
      CallExpression(call) {
        const array = mapped(call);
        if (array === undefined || isConstant(array)) return;
        const view = scrollViewAround(call, new Set());
        if (view !== undefined) context.report({ node: call, messageId: "data", data: { view } });
      },
    };
  },
});
