import { ruleTester } from "../rule-tester.ts";
import { noDynamicImport } from "./no-dynamic-import.ts";

ruleTester.run("no-dynamic-import", noDynamicImport, {
  valid: [
    'import { postMessage } from "../chat/posting";',
    'export { worker } from "./application";',
  ],
  invalid: [
    {
      code: 'export const post = async () => (await import("../chat/posting")).postMessage;',
      errors: [{ messageId: "dynamic" }],
    },
    {
      code: "const name = '../db/database'; void import(name);",
      errors: [{ messageId: "dynamic" }],
    },
  ],
});
