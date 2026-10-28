import { RuleTester } from "vite-plus/lint/plugins-dev";
import { describe, it } from "vite-plus/test";

RuleTester.describe = (text, method) => {
  describe(text, method);
};
RuleTester.it = (text, method) => {
  it(text, method);
};

/** A RuleTester that reads TypeScript, reporting through Vitest. */
export const ruleTester: RuleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: "ts" } },
});

/** The same, reading TSX, for rules about JSX. */
export const tsxRuleTester: RuleTester = new RuleTester({
  languageOptions: { parserOptions: { lang: "tsx" } },
});
