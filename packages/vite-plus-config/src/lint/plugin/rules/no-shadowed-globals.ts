import { runInNewContext } from "node:vm";
import { defineRule } from "vite-plus/lint/plugins";

// The language's own globals, as a fresh context holds them: no browser, Node or Hermes names, so
// a local `event` or `name` stays free. Oxlint's `no-shadow` with `builtinGlobals` flags those too.
const languageGlobals = new Set(Object.getOwnPropertyNames(runInNewContext("globalThis")));

// The React Compiler's output calls `Symbol.for` in every compiled component, so a binding named
// `Symbol` (such as `const Symbol = withUniwind(...)`) breaks each one in its scope. Any
// language global is the same hazard.
export const noShadowedGlobals = defineRule({
  meta: {
    messages: {
      shadowed:
        "`{{name}}` is a language global: code in this scope, and the React Compiler's output, would read this binding instead. Name it differently.",
    },
  },
  create(context) {
    // A class declares its name twice, outside and inside its body.
    const reported = new Set<unknown>();
    const check = (node: Parameters<typeof context.sourceCode.getDeclaredVariables>[0]) => {
      for (const variable of context.sourceCode.getDeclaredVariables(node)) {
        const [identifier = node] = variable.identifiers;
        if (languageGlobals.has(variable.name) && !reported.has(identifier)) {
          reported.add(identifier);
          context.report({
            node: identifier,
            messageId: "shadowed",
            data: { name: variable.name },
          });
        }
      }
    };
    return {
      VariableDeclarator: check,
      FunctionDeclaration: check,
      ClassDeclaration: check,
      ImportSpecifier: check,
      ImportDefaultSpecifier: check,
      ImportNamespaceSpecifier: check,
    };
  },
});
