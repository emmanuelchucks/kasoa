import { ruleTester } from "../rule-tester.ts";
import { disableReason } from "./disable-reason.ts";

ruleTester.run("disable-reason", disableReason, {
  valid: [
    "// oxlint-disable-next-line no-await-in-loop -- each page needs the last one's token\nfoo();",
    "foo();\t// oxlint-disable-line max-params -- the library's own signature",
    "/* oxlint-disable no-bitwise -- an ADTS header is bit fields */\nfoo();\n/* oxlint-enable no-bitwise */",
    "/* oxlint-disable no-bitwise, no-plusplus -- bit fields, counted */\nfoo();\n/* oxlint-enable */",
    "// eslint-disable-next-line no-console -- the CLI's only output\nfoo();",
    "// Mentions oxlint-disable in passing, which isn't a directive.\nfoo();",
  ],
  invalid: [
    {
      code: "// oxlint-disable-next-line no-await-in-loop\nfoo();",
      errors: [{ messageId: "reason" }],
    },
    {
      code: "// oxlint-disable-next-line no-await-in-loop -- as above\nfoo();",
      errors: [{ messageId: "reason" }],
    },
    { code: "// eslint-disable-next-line no-console\nfoo();", errors: [{ messageId: "reason" }] },
    {
      code: "/* oxlint-disable no-bitwise -- an ADTS header is bit fields */\nfoo();",
      errors: [{ messageId: "unclosed", data: { rules: "no-bitwise" } }],
    },
    {
      code: "/* oxlint-disable no-bitwise, no-plusplus -- bit fields, counted */\nfoo();\n/* oxlint-enable no-bitwise */",
      errors: [{ messageId: "unclosed", data: { rules: "no-plusplus" } }],
    },
  ],
});
