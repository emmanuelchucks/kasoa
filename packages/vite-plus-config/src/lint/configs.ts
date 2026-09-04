import type { LintConfig } from "./types.ts";
import {
  CLOUDFLARE_WORKER_IGNORE_PATTERNS,
  CODE_FILES,
  COMMONJS_FILES,
  CONFIG_FILES,
  DEFAULT_IGNORE_PATTERNS,
  REACT_NATIVE_IGNORE_PATTERNS,
  REACT_NATIVE_JEST_SETUP_FILES,
  REACT_NATIVE_JEST_TEST_FILES,
  RUNTIME_OVERRIDE_EXCLUDE_FILES,
  TEST_FILES,
  VITEST_SETUP_FILES,
} from "../constants.ts";
import {
  BASE_LINT_PLUGINS,
  browserEnvironment,
  browserTestLint,
  cloudflareWorkerEnvironment,
  cloudflareWorkerLint,
  cloudflareWorkerTestLint,
  neutralEnvironment,
  neutralLint,
  nodeEnvironment,
  nodeLint,
  nodeTestLint,
  reactNativeJestTestLint,
  reactNativeRuntimeLint,
} from "./profiles.ts";
import { browserRules } from "./rules/browser.ts";
import { nodeRules } from "./rules/node.ts";
import { reactCoreRules } from "./rules/react-core.ts";
import { reactDomRules } from "./rules/react-dom.ts";
import { reactNativeRules } from "./rules/react-native.ts";
import { universalRules } from "./rules/universal.ts";

export const baseLintConfig: LintConfig = {
  plugins: [...BASE_LINT_PLUGINS],
  ignorePatterns: [...DEFAULT_IGNORE_PATTERNS],
  env: neutralEnvironment,
  globals: neutralLint.globals,
  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
    typeCheck: true,
  },
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  extends: [{ rules: universalRules }],
  overrides: [
    {
      files: [...COMMONJS_FILES],
      ...nodeLint,
      rules: {
        ...nodeRules,
        "typescript/no-require-imports": "off",
      },
    },
    {
      files: [...CONFIG_FILES],
      ...nodeLint,
      rules: {
        ...nodeRules,
        "func-names": "off",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "typescript/no-empty-object-type": "off",
      },
    },
  ],
};

export const nodeRuntimeLintConfig: LintConfig = {
  env: nodeEnvironment,
  globals: nodeLint.globals,
  plugins: ["node"],
  extends: [{ rules: nodeRules }],
};

export const browserRuntimeLintConfig: LintConfig = {
  env: browserEnvironment,
  globals: neutralLint.globals,
  overrides: [
    {
      files: [...CODE_FILES],
      excludeFiles: [...RUNTIME_OVERRIDE_EXCLUDE_FILES],
      rules: browserRules,
    },
  ],
};

export const reactCoreLintConfig: LintConfig = {
  plugins: ["react"],
  extends: [{ rules: reactCoreRules }],
};

export const reactDomLintConfig: LintConfig = {
  plugins: ["jsx-a11y"],
  extends: [{ rules: reactDomRules }],
};

export const reactNativeRuntimeLintConfig: LintConfig = {
  env: reactNativeRuntimeLint.env,
  globals: reactNativeRuntimeLint.globals,
  extends: [{ rules: reactNativeRules }],
};

export const cloudflareWorkerRuntimeLintConfig: LintConfig = {
  env: cloudflareWorkerEnvironment,
  globals: cloudflareWorkerLint.globals,
};

export const reactNativeGeneratedLintConfig: LintConfig = {
  ignorePatterns: [...REACT_NATIVE_IGNORE_PATTERNS],
};

export const cloudflareWorkerGeneratedLintConfig: LintConfig = {
  ignorePatterns: [...CLOUDFLARE_WORKER_IGNORE_PATTERNS],
};

export const nodeTestLintConfig: LintConfig = {
  overrides: [
    {
      files: [...TEST_FILES],
      ...nodeTestLint,
    },
  ],
};

export const browserTestLintConfig: LintConfig = {
  overrides: [
    {
      files: [...TEST_FILES],
      ...browserTestLint,
    },
  ],
};

export const cloudflareWorkerTestLintConfig: LintConfig = {
  overrides: [
    {
      files: [...TEST_FILES],
      ...cloudflareWorkerTestLint,
    },
  ],
};

export const reactNativeTestLintConfig: LintConfig = {
  overrides: [
    {
      files: [...TEST_FILES],
      excludeFiles: [
        ...VITEST_SETUP_FILES,
        ...REACT_NATIVE_JEST_TEST_FILES,
        ...REACT_NATIVE_JEST_SETUP_FILES,
      ],
      ...nodeTestLint,
    },
    {
      files: [...VITEST_SETUP_FILES],
      excludeFiles: [...REACT_NATIVE_JEST_TEST_FILES, ...REACT_NATIVE_JEST_SETUP_FILES],
      ...nodeTestLint,
      rules: {
        ...nodeTestLint.rules,
        "vitest/no-restricted-vi-methods": "off",
      },
    },
    {
      files: [...REACT_NATIVE_JEST_TEST_FILES],
      excludeFiles: [...VITEST_SETUP_FILES, ...REACT_NATIVE_JEST_SETUP_FILES],
      ...reactNativeJestTestLint,
    },
    {
      files: [...REACT_NATIVE_JEST_SETUP_FILES],
      excludeFiles: [...VITEST_SETUP_FILES, ...REACT_NATIVE_JEST_TEST_FILES],
      ...reactNativeJestTestLint,
      rules: {
        ...reactNativeJestTestLint.rules,
        "jest/no-restricted-jest-methods": "off",
      },
    },
  ],
};
