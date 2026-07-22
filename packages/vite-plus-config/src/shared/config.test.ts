import { describe, expect, it } from "vite-plus/test";
import type { ConfigInput } from "./config.ts";
import { createConfig } from "../react/index.ts";
import { mergeConfigFragments } from "./config.ts";

describe("mergeConfigFragments()", () => {
  it("treats every lint rule configuration as an atomic value", () => {
    const config = mergeConfigFragments(
      {
        lint: {
          rules: {
            "capitalized-comments": "error",
            complexity: ["error", { max: 20 }],
            eqeqeq: "error",
            "max-params": ["error", { max: 3 }],
          },
        },
      },
      {
        lint: {
          rules: {
            "capitalized-comments": ["warn", "always"],
            complexity: "off",
            eqeqeq: "warn",
            "max-params": ["warn", { max: 5 }],
          },
        },
      },
    );

    expect(config.lint?.rules).toStrictEqual({
      "capitalized-comments": ["warn", "always"],
      complexity: "off",
      eqeqeq: "warn",
      "max-params": ["warn", { max: 5 }],
    });
  });

  it("merges rule maps by name with the last fragment winning", () => {
    const config = mergeConfigFragments(
      {
        lint: {
          rules: {
            complexity: ["error", { max: 20 }],
            eqeqeq: "error",
          },
        },
      },
      {
        lint: {
          rules: {
            complexity: "warn",
            "no-alert": "error",
          },
        },
      },
      {
        lint: {
          rules: {
            complexity: "off",
          },
        },
      },
    );

    expect(config.lint?.rules).toStrictEqual({
      complexity: "off",
      eqeqeq: "error",
      "no-alert": "error",
    });
  });

  it("does not mutate the base or override fragments", () => {
    const base = {
      lint: {
        rules: {
          complexity: ["error", { max: 20 }],
          eqeqeq: "error",
        },
      },
    } satisfies ConfigInput;
    const firstOverride = {
      lint: {
        rules: {
          complexity: "warn",
        },
      },
    } satisfies ConfigInput;
    const lastOverride = {
      lint: {
        rules: {
          complexity: "off",
        },
      },
    } satisfies ConfigInput;
    const inputsBeforeMerge = structuredClone([base, firstOverride, lastOverride]);

    mergeConfigFragments(base, firstOverride, lastOverride);

    expect([base, firstOverride, lastOverride]).toStrictEqual(inputsBeforeMerge);
  });
});

describe("React createConfig()", () => {
  it("replaces preset rule tuples while preserving normal array merging", () => {
    const config = createConfig({
      lint: {
        rules: {
          complexity: "off",
          "max-params": ["warn", { max: 5 }],
        },
      },
      test: {
        include: ["custom.test.ts"],
      },
    });

    expect({
      complexity: config.lint?.rules?.complexity,
      maxParams: config.lint?.rules?.["max-params"],
    }).toStrictEqual({
      complexity: "off",
      maxParams: ["warn", { max: 5 }],
    });
    expect(config.test?.include).toStrictEqual([
      "**/*.{test,spec}.{ts,tsx,mts,cts}",
      "custom.test.ts",
    ]);
  });
});
