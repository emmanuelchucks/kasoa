import type { LintConfig, LintProfile } from "./types.ts";
import { browserRules } from "./rules/browser.ts";
import { nodeRules } from "./rules/node.ts";
import { reactCoreRules } from "./rules/react-core.ts";
import { reactDomRules } from "./rules/react-dom.ts";
import { reactNativeRules } from "./rules/react-native.ts";
import { vitestRules } from "./rules/vitest.ts";

export const BASE_LINT_PLUGINS = ["typescript", "unicorn", "oxc", "import", "promise"] as const;

export const neutralEnvironment: NonNullable<LintConfig["env"]> = {
  browser: false,
  node: false,
  serviceworker: false,
  worker: false,
} as const;

export const nodeEnvironment: NonNullable<LintConfig["env"]> = {
  ...neutralEnvironment,
  node: true,
} as const;

export const browserEnvironment: NonNullable<LintConfig["env"]> = {
  ...neutralEnvironment,
  browser: true,
} as const;

export const reactNativeEnvironment: NonNullable<LintConfig["env"]> = {
  ...neutralEnvironment,
} as const;

export const cloudflareWorkerEnvironment: NonNullable<LintConfig["env"]> = {
  ...neutralEnvironment,
  serviceworker: true,
  worker: true,
} as const;

const platformGlobalsOff = {
  __DEV__: "off",
  Cloudflare: "off",
  DigestStream: "off",
  FixedLengthStream: "off",
  HTMLRewriter: "off",
  IdentityTransformStream: "off",
  process: "off",
  WebSocketPair: "off",
  WebSocketRequestResponsePair: "off",
} as const;

const nodeGlobals = {
  ...platformGlobalsOff,
  console: "readonly",
  process: "readonly",
} as const;

const cloudflareWorkerGlobals = {
  ...platformGlobalsOff,
  Cloudflare: "readonly",
  DigestStream: "readonly",
  FixedLengthStream: "readonly",
  HTMLRewriter: "readonly",
  IdentityTransformStream: "readonly",
  WebSocketPair: "readonly",
  WebSocketRequestResponsePair: "readonly",
} as const;

export const neutralLint: LintProfile = {
  env: neutralEnvironment,
  globals: platformGlobalsOff,
  plugins: [...BASE_LINT_PLUGINS],
};

export const nodeLint: LintProfile = {
  env: nodeEnvironment,
  globals: nodeGlobals,
  plugins: [...BASE_LINT_PLUGINS, "node"],
  rules: nodeRules,
};

export const browserLint: LintProfile = {
  env: browserEnvironment,
  globals: platformGlobalsOff,
  plugins: [...BASE_LINT_PLUGINS],
  rules: browserRules,
};

export const reactCoreLint: LintProfile = {
  plugins: [...BASE_LINT_PLUGINS, "react"],
  rules: reactCoreRules,
};

export const reactDomLint: LintProfile = {
  plugins: [...BASE_LINT_PLUGINS, "react", "jsx-a11y"],
  rules: reactDomRules,
};

const reactNativeGlobals = {
  ...platformGlobalsOff,
  __BUNDLE_START_TIME__: "readonly",
  __DEV__: "readonly",
  AbortController: "readonly",
  AbortSignal: "readonly",
  alert: "readonly",
  Blob: "readonly",
  cancelAnimationFrame: "readonly",
  clearImmediate: "readonly",
  clearInterval: "readonly",
  clearTimeout: "readonly",
  console: "readonly",
  crypto: "readonly",
  DOMRect: "readonly",
  ErrorUtils: "readonly",
  Event: "readonly",
  EventTarget: "readonly",
  fetch: "readonly",
  fetchBundle: "readonly",
  File: "readonly",
  FileReader: "readonly",
  FormData: "readonly",
  Headers: "readonly",
  HermesInternal: "readonly",
  navigator: "readonly",
  originalXMLHttpRequest: "readonly",
  performance: "readonly",
  process: "readonly",
  queueMicrotask: "readonly",
  requestAnimationFrame: "readonly",
  Request: "readonly",
  require: "readonly",
  Response: "readonly",
  setImmediate: "readonly",
  setInterval: "readonly",
  setTimeout: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  WebSocket: "readonly",
  XMLHttpRequest: "readonly",
  XMLHttpRequestUpload: "readonly",
} as const;

export const reactNativeRuntimeLint: LintProfile = {
  env: reactNativeEnvironment,
  globals: reactNativeGlobals,
  plugins: [...BASE_LINT_PLUGINS, "react"],
  rules: reactNativeRules,
};

export const reactWebLint: LintProfile = {
  env: browserEnvironment,
  globals: platformGlobalsOff,
  plugins: [...BASE_LINT_PLUGINS, "react", "jsx-a11y"],
  rules: {
    ...browserRules,
    ...reactCoreRules,
    ...reactDomRules,
  },
};

export const reactNativeLint: LintProfile = {
  env: reactNativeEnvironment,
  globals: reactNativeGlobals,
  plugins: [...BASE_LINT_PLUGINS, "react"],
  rules: {
    ...reactCoreRules,
    ...reactNativeRules,
  },
};

export const cloudflareWorkerLint: LintProfile = {
  env: cloudflareWorkerEnvironment,
  globals: cloudflareWorkerGlobals,
  plugins: [...BASE_LINT_PLUGINS],
};

export const nodeTestLint: LintProfile = {
  ...nodeLint,
  plugins: [...BASE_LINT_PLUGINS, "node", "vitest"],
  rules: {
    ...nodeRules,
    ...vitestRules,
  },
};

export const browserTestLint: LintProfile = {
  ...browserLint,
  plugins: [...BASE_LINT_PLUGINS, "vitest"],
  rules: {
    ...browserRules,
    ...vitestRules,
  },
};

export const cloudflareWorkerTestLint: LintProfile = {
  ...cloudflareWorkerLint,
  plugins: [...BASE_LINT_PLUGINS, "vitest"],
  rules: vitestRules,
};
