import type { LintRules } from "../types.ts";

export const jestRules: LintRules = {
  "max-nested-callbacks": [
    "error",
    {
      max: 4,
    },
  ],
  "jest/consistent-test-it": [
    "error",
    {
      fn: "test",
      withinDescribe: "it",
    },
  ],
  "jest/max-nested-describe": [
    "error",
    {
      max: 3,
    },
  ],
  "jest/no-alias-methods": "error",
  "jest/no-duplicate-hooks": "error",
  "jest/no-identical-title": "error",
  "jest/no-interpolation-in-snapshots": "error",
  "jest/no-large-snapshots": "error",
  "jest/no-mocks-import": "error",
  "jest/no-restricted-jest-methods": [
    "error",
    {
      doMock: "Use a maintained implementation, spy, or injected owned dependency.",
      mock: "Use a maintained implementation, spy, or injected owned dependency.",
      unstable_mockModule: "Use a maintained implementation, spy, or injected owned dependency.",
    },
  ],
  "jest/no-test-prefixes": "error",
  "jest/no-test-return-statement": "error",
  "jest/no-unneeded-async-expect-function": "error",
  "jest/padding-around-after-all-blocks": "error",
  "jest/padding-around-test-blocks": "error",
  "jest/prefer-called-with": "error",
  "jest/prefer-comparison-matcher": "error",
  "jest/prefer-each": "error",
  "jest/prefer-equality-matcher": "error",
  "jest/prefer-hooks-in-order": "error",
  "jest/prefer-hooks-on-top": "error",
  "jest/prefer-importing-jest-globals": "error",
  "jest/prefer-mock-promise-shorthand": "error",
  "jest/prefer-mock-return-shorthand": "error",
  "jest/prefer-spy-on": "error",
  "jest/prefer-to-be": "error",
  "jest/prefer-to-contain": "error",
  "jest/prefer-to-have-been-called-times": "error",
  "jest/prefer-to-have-length": "error",
  "jest/prefer-todo": "error",
};
