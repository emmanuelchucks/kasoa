import type { UserConfig } from "vite-plus";
import type { ConfigFragment } from "./compose.ts";
import {
  DEFAULT_STAGED_CHECK_COMMAND,
  DEFAULT_STAGED_CHECK_GLOB,
  DEFAULT_STAGED_FORMAT_COMMAND,
  DEFAULT_STAGED_FORMAT_GLOB,
} from "./constants.ts";
import {
  baseFormatConfig,
  cloudflareWorkerFormatConfig,
  reactFormatConfig,
  reactNativeFormatConfig,
} from "./format.ts";
import {
  baseLintConfig,
  browserRuntimeLintConfig,
  browserTestLintConfig as browserTestLintSettings,
  cloudflareWorkerGeneratedLintConfig,
  cloudflareWorkerRuntimeLintConfig,
  cloudflareWorkerTestLintConfig as cloudflareWorkerTestLintSettings,
  nodeRuntimeLintConfig,
  nodeTestLintConfig as nodeTestLintSettings,
  reactCoreLintConfig,
  reactDomLintConfig,
  reactNativeGeneratedLintConfig,
  reactNativeRuntimeLintConfig,
  reactNativeTestLintConfig as reactNativeTestLintSettings,
} from "./lint/configs.ts";

type PackConfig = Exclude<UserConfig["pack"], readonly unknown[] | undefined>;

export const baseToolingConfig: ConfigFragment = {
  fmt: baseFormatConfig,
  lint: baseLintConfig,
  staged: {
    [DEFAULT_STAGED_CHECK_GLOB]: DEFAULT_STAGED_CHECK_COMMAND,
    [DEFAULT_STAGED_FORMAT_GLOB]: DEFAULT_STAGED_FORMAT_COMMAND,
  },
};

export const nodeRuntimeConfig: ConfigFragment = {
  lint: nodeRuntimeLintConfig,
};

export const browserRuntimeConfig: ConfigFragment = {
  lint: browserRuntimeLintConfig,
};

export const reactCoreConfig: ConfigFragment = {
  fmt: reactFormatConfig,
  lint: reactCoreLintConfig,
};

export const reactDomConfig: ConfigFragment = {
  lint: reactDomLintConfig,
};

export const reactNativeRuntimeConfig: ConfigFragment = {
  lint: reactNativeRuntimeLintConfig,
};

export const reactNativeGeneratedConfig: ConfigFragment = {
  fmt: reactNativeFormatConfig,
  lint: reactNativeGeneratedLintConfig,
};

export const cloudflareWorkerRuntimeConfig: ConfigFragment = {
  lint: cloudflareWorkerRuntimeLintConfig,
};

export const cloudflareWorkerGeneratedConfig: ConfigFragment = {
  fmt: cloudflareWorkerFormatConfig,
  lint: cloudflareWorkerGeneratedLintConfig,
};

export const nodeTestLintConfig: ConfigFragment = {
  lint: nodeTestLintSettings,
};

export const browserTestLintConfig: ConfigFragment = {
  lint: browserTestLintSettings,
};

export const cloudflareWorkerTestLintConfig: ConfigFragment = {
  lint: cloudflareWorkerTestLintSettings,
};

export const reactNativeTestLintConfig: ConfigFragment = {
  lint: reactNativeTestLintSettings,
};

export const libraryPackDefaults: PackConfig = {
  attw: {
    level: "error",
    profile: "esm-only",
  },
  clean: true,
  dts: true,
  format: ["esm"],
  publint: {
    strict: true,
  },
  sourcemap: true,
};

export const libraryPackConfig: ConfigFragment = {
  pack: libraryPackDefaults,
};

export const workspaceRunConfig: ConfigFragment = {
  run: {
    cache: {
      scripts: true,
      tasks: true,
    },
    enablePrePostScripts: true,
  },
};
