# OXLint Config Completion Plan

## Overview

Complete the `@kasoa/oxlint-config` package by:

1. Replacing the current JS plugin re-exports (`src/plugins/*.ts`) with JSON rule files
2. Adding a CLI for scaffolding configs (like `@kasoa/oxfmt-config`)
3. Updating package.json to remove plugin exports and add bin field

## Current State

### What Exists

- `src/base.json` - Basic config with categories + some rules
- `src/node.json` - Extends base, adds node plugin
- `src/react.json` - Extends base, adds react/react-perf/jsx-a11y plugins
- `src/plugins/*.ts` - 6 files that just re-export ESLint plugins (to be deleted)

### What's Missing

- CLI for scaffolding configs
- JSON rule files for JS plugins (vitest, sonarjs, perfectionist, etc.)
- Restriction category rules
- Pedantic rules to disable

## Target Structure

```
src/
├── base.json                 # Categories + core rules, extends plugins/
├── node.json                 # Extends base, adds node plugin
├── react.json                # Extends base + react plugins
├── cli.ts                    # CLI to copy configs
└── plugins/
    ├── vitest.json           # 76 vitest rules (all config)
    ├── perfectionist.json    # 4 base perfectionist rules
    ├── perfectionist-jsx.json # sort-jsx-props rule (for react)
    ├── sonarjs.json          # sonarjs recommended + overrides
    ├── react-compiler.json   # 1 rule
    ├── react-you-might-not-need-an-effect.json # 10 rules
    ├── eslint-react.json     # strict-type-checked rules + overrides
    ├── restriction.json      # High-value restriction rules to enable
    └── pedantic.json         # Pedantic rules to disable
```

## Implementation Phases

### Phase 1: Delete Old Plugin Files

- [ ] Delete `src/plugins/vitest.ts`
- [ ] Delete `src/plugins/sonarjs.ts`
- [ ] Delete `src/plugins/perfectionist.ts`
- [ ] Delete `src/plugins/react-compiler.ts`
- [ ] Delete `src/plugins/react-you-might-not-need-an-effect.ts`
- [ ] Delete `src/plugins/eslint-react.ts`

### Phase 2: Create Plugin JSON Files

- [ ] Create `src/plugins/vitest.json` (76 rules from `vitest.configs.all`)
- [ ] Create `src/plugins/sonarjs.json` (recommended + `cognitive-complexity: ["warn", 15]`, `deprecation: "off"`)
- [ ] Create `src/plugins/perfectionist.json` (4 rules: sort-imports, sort-named-imports, sort-interfaces, sort-object-types)
- [ ] Create `src/plugins/perfectionist-jsx.json` (1 rule: sort-jsx-props with custom groups)
- [ ] Create `src/plugins/react-compiler.json` (1 rule: `react-compiler/react-compiler: "error"`)
- [ ] Create `src/plugins/react-you-might-not-need-an-effect.json` (10 rules from recommended)
- [ ] Create `src/plugins/eslint-react.json` (strict-type-checked rules + 2 overrides)
- [ ] Create `src/plugins/restriction.json` (high-value restriction rules)
- [ ] Create `src/plugins/pedantic.json` (pedantic rules to disable)

### Phase 3: Update Main JSON Files

- [ ] Update `src/base.json` to extend from plugins/ (restriction, pedantic, perfectionist, sonarjs, vitest)
- [ ] Update `src/react.json` to extend from plugins/ (perfectionist-jsx, react-compiler, react-you-might-not-need-an-effect, eslint-react)
- [ ] Verify `src/node.json` (may not need changes)

### Phase 4: Create CLI

- [ ] Create `src/cli.ts` (copy from oxfmt-config, adapt for oxlint)
  - `npx @kasoa/oxlint-config init` → copies base config + plugins/
  - `npx @kasoa/oxlint-config init --react` → copies react config + plugins/
  - `npx @kasoa/oxlint-config init --node` → copies node config + plugins/

### Phase 5: Update package.json

- [ ] Add `bin` field: `"oxlint-config": "./dist/cli.js"`
- [ ] Remove all `./plugins/*` exports
- [ ] Update build script to copy all JSON files including `plugins/*.json`
- [ ] Keep JS plugin dependencies (needed for rule research/reference)

### Phase 6: Sync ESLint Config

- [ ] Add `unicorn/no-array-for-each` rule to `packages/eslint-config/src/base/unicorn-x.ts`

### Phase 7: Update README

- [ ] Document CLI usage and flags

## Plugin JSON Details

### restriction.json

High-value restriction rules to enable (not enabled by default):

```json
{
  "rules": {
    "typescript/no-explicit-any": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-empty-object-type": "error",
    "typescript/use-unknown-in-catch-callback-variable": "error",
    "typescript/no-dynamic-delete": "error",
    "typescript/no-namespace": "error",
    "typescript/promise-function-async": "error",
    "eslint/complexity": "warn",
    "eslint/no-empty": "error",
    "eslint/no-empty-function": "error",
    "import/no-cycle": "error",
    "unicorn/no-abusive-eslint-disable": "error",
    "unicorn/prefer-node-protocol": "error",
    "unicorn/no-array-for-each": "error",
    "react/only-export-components": "error",
    "react/button-has-type": "error",
    "react/no-danger": "error",
    "react/no-unknown-property": "error"
  }
}
```

### pedantic.json

Pedantic rules to disable (too strict):

```json
{
  "rules": {
    "eslint/max-lines": "off",
    "eslint/max-lines-per-function": "off",
    "eslint/no-inline-comments": "off",
    "eslint/no-warning-comments": "off",
    "eslint/sort-vars": "off"
  }
}
```

### Rules to Research During Implementation

- [ ] All 76 vitest rules from `vitest.configs.all`
- [ ] All sonarjs recommended rules
- [ ] All eslint-react strict-type-checked rules + 2 overrides
- [ ] All 10 react-you-might-not-need-an-effect rules

## CLI Usage (Final)

```bash
# Base config (Node.js projects without React)
npx @kasoa/oxlint-config init

# React config
npx @kasoa/oxlint-config init --react

# Node config (servers, CLIs)
npx @kasoa/oxlint-config init --node
```

## Notes

- OXLint's `extends` supports local paths like `"./plugins/vitest.json"`
- OXLint does NOT support `extends` from `node_modules` (GitHub issues #15538, #18213)
- CLI approach required - must copy JSON files to user's project
- Keep JS plugin dependencies in package.json for rule research/reference
