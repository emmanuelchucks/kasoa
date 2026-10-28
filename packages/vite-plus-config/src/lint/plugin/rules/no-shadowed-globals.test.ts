import { ruleTester } from "../rule-tester.ts";
import { noShadowedGlobals } from "./no-shadowed-globals.ts";

ruleTester.run("no-shadowed-globals", noShadowedGlobals, {
  valid: [
    "const Tinted = withUniwind(SymbolView, {});",
    "const event = 1; const name = 2;",
    'import { Symbol as SymbolView } from "expo-symbols";',
    "const x = Symbol.for('a');",
  ],
  invalid: [
    { code: "const Symbol = withUniwind(SymbolView, {});", errors: [{ messageId: "shadowed" }] },
    { code: "function Map() {}", errors: [{ messageId: "shadowed" }] },
    { code: "class Promise {}", errors: [{ messageId: "shadowed" }] },
    { code: 'import { Set } from "x";', errors: [{ messageId: "shadowed" }] },
    { code: "function f() { const { Array } = props; }", errors: [{ messageId: "shadowed" }] },
  ],
});
