# ESLint/Prettier to OXLint/Oxfmt Migration Plan

## Overview

Migrate from ESLint + Prettier to OXLint + Oxfmt for faster linting and formatting while preserving all current rules. Create two new packages (`@kasoa/oxlint-config` and `@kasoa/oxfmt-config`) without modifying existing `@kasoa/eslint-config` and `@kasoa/prettier-config`.

**Additionally**: Backport improvements to `@kasoa/eslint-config` (simplify perfectionist, remove naming-convention, remove json-schema-validator).

## Key Decisions

| Decision               | Choice                                                           |
| ---------------------- | ---------------------------------------------------------------- |
| Tailwind sorting       | Oxfmt's built-in `experimentalTailwindcss`                       |
| Oxfmt config sharing   | CLI tool to generate `.oxfmtrc.json`                             |
| Unsupported plugins    | JS plugins (10-15x faster than ESLint with 6 plugins)            |
| Type-aware linting     | Enable (`--type-aware` flag)                                     |
| Import sorting         | Oxfmt's `experimentalSortImports` (matches perfectionist groups) |
| `printWidth`           | Use Oxfmt default (100)                                          |
| Naming convention      | **REMOVE** - low value vs noise                                  |
| JSON schema validation | **REMOVE** - editors handle this                                 |
| Perfectionist          | **SIMPLIFY** - keep only 4 essential rules                       |

## Performance Expectations

| Tool         | Before            | After                 | Improvement       |
| ------------ | ----------------- | --------------------- | ----------------- |
| Linting      | ESLint            | OXLint + 6 JS plugins | **10-15x faster** |
| Type linting | typescript-eslint | OXLint type-aware     | **20-40x faster** |
| Formatting   | Prettier          | Oxfmt                 | **30x faster**    |

---

## Phase 0: Backport Improvements to `@kasoa/eslint-config`

These changes apply to the **existing** eslint-config package to keep it in sync with the simplified approach.

### Changes to Make

| File                            | Change                                                             |
| ------------------------------- | ------------------------------------------------------------------ |
| `src/base/typescript-eslint.ts` | Remove `@typescript-eslint/naming-convention` rule                 |
| `src/base/perfectionist.ts`     | Simplify to 4 rules (imports, interfaces, object-types, jsx-props) |
| `src/base/json.ts`              | **DELETE FILE**                                                    |
| `src/base/index.ts`             | Remove `jsonConfig` import and usage                               |
| `package.json`                  | Remove `eslint-plugin-json-schema-validator` dependency            |

### Simplified Perfectionist Config

**Before**: 15 sorting rules with complex custom groups for everything.

**After**: 4 rules - imports, interfaces, object-types, jsx-props (with custom groups for JSX only).

```typescript
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";

const baseConfig = {
  order: "asc" as const,
  type: "natural" as const,
};

export const perfectionistConfig = defineConfig({
  plugins: { perfectionist },
  rules: {
    "perfectionist/sort-imports": [
      "error",
      {
        ...baseConfig,
        newlinesBetween: 0,
        groups: [
          "type-import",
          ["type-parent", "type-sibling", "type-index", "type-internal"],
          "value-builtin",
          "value-external",
          "value-internal",
          ["value-parent", "value-sibling", "value-index"],
          "value-side-effect",
          "unknown",
        ],
      },
    ],
    "perfectionist/sort-named-imports": ["error", baseConfig],
    "perfectionist/sort-interfaces": ["error", baseConfig],
    "perfectionist/sort-object-types": ["error", baseConfig],
  },
});

export const perfectionistJsxConfig = defineConfig({
  plugins: { perfectionist },
  rules: {
    "perfectionist/sort-jsx-props": [
      "error",
      {
        ...baseConfig,
        customGroups: [
          { elementNamePattern: "^key$", groupName: "key" },
          { elementNamePattern: "^ref$", groupName: "ref" },
          { elementNamePattern: "^on[A-Z]", groupName: "callback" },
          {
            elementNamePattern: "(?:^className$|ClassName$)",
            groupName: "className",
          },
        ],
        groups: ["key", "ref", "unknown", "callback", "className"],
      },
    ],
  },
});
```

---

## Package Structure

```
packages/
├── oxlint-config/
│   ├── package.json
│   ├── tsconfig.json
│   ├── .oxlintrc.json          # Symlink to dist/base.json
│   ├── .oxfmtrc.json           # Uses oxfmt-config
│   ├── src/
│   │   ├── base.json
│   │   ├── node.json
│   │   ├── react.json
│   │   └── plugins/
│   │       ├── sonarjs.ts
│   │       ├── perfectionist.ts
│   │       ├── react-compiler.ts
│   │       ├── react-you-might-not-need-an-effect.ts
│   │       ├── eslint-react.ts
│   │       └── vitest.ts
│   └── dist/
│       ├── base.json
│       ├── node.json
│       ├── react.json
│       └── plugins/*.js
│
└── oxfmt-config/
    ├── package.json
    ├── tsconfig.json
    ├── .oxlintrc.json
    ├── .oxfmtrc.json
    ├── src/
    │   ├── base.json
    │   ├── react.json
    │   └── cli.ts
    └── dist/
        ├── base.json
        ├── react.json
        └── cli.js
```

---

## OXLint Configuration

### Category Strategy

Set categories to strict level, override individual problematic rules:

```json
{
  "categories": {
    "correctness": "error",
    "suspicious": "error",
    "pedantic": "error",
    "perf": "warn"
  }
}
```

### Pedantic Overrides (Known False Positives)

| Rule                        | Issue                                                        | Override To |
| --------------------------- | ------------------------------------------------------------ | ----------- |
| `typescript/ban-ts-comment` | Sometimes `@ts-ignore` is needed (prefer `@ts-expect-error`) | `"warn"`    |
| `eslint/no-magic-numbers`   | Too noisy, flags common patterns                             | `"off"`     |
| `unicorn/no-null`           | Too restrictive, use disable comments for exceptions         | `"off"`     |

### Nursery Rules Worth Enabling

| Rule                               | What It Catches                | AI Value | Setting   |
| ---------------------------------- | ------------------------------ | -------- | --------- |
| `import/named`                     | Importing non-existent exports | CRITICAL | `"error"` |
| `import/export`                    | Duplicate exports, conflicts   | HIGH     | `"warn"`  |
| `eslint/no-unreachable`            | Dead code                      | HIGH     | `"warn"`  |
| `promise/no-return-wrap`           | Unnecessary Promise wrapping   | HIGH     | `"warn"`  |
| `react/require-render-return`      | Missing return in components   | HIGH     | `"error"` |
| `typescript/prefer-optional-chain` | Verbose null checks            | MEDIUM   | `"warn"`  |

### Gitignore Handling

OXLint automatically reads local `.gitignore` files - no extra config needed for basic cases.

For additional patterns, use `ignorePatterns`:

```json
{
  "ignorePatterns": ["**/dist/**", "**/node_modules/**", "**/*.d.ts"]
}
```

### Native Rule: No Barrel Files

Use OXLint's native rule instead of `eslint-plugin-no-barrel-files`:

```json
{
  "rules": {
    "oxc/no-barrel-file": "error"
  }
}
```

### Base Config (`src/base.json`)

```json
{
  "$schema": "https://unpkg.com/oxlint/configuration_schema.json",
  "plugins": ["typescript", "unicorn", "import", "promise"],
  "categories": {
    "correctness": "error",
    "suspicious": "error",
    "pedantic": "error",
    "perf": "warn"
  },
  "rules": {
    "typescript/ban-ts-comment": "warn",
    "eslint/no-magic-numbers": "off",
    "unicorn/no-null": "off",

    "import/named": "error",
    "import/export": "warn",
    "eslint/no-unreachable": "warn",
    "promise/no-return-wrap": "warn",
    "typescript/prefer-optional-chain": "warn",

    "oxc/no-barrel-file": "error",

    "curly": "error",
    "default-case-last": "error",
    "eqeqeq": "error",
    "grouped-accessor-pairs": "error",
    "max-params": "warn",
    "no-alert": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-constructor-return": "error",
    "no-else-return": "error",
    "no-param-reassign": "error",
    "no-unneeded-ternary": "error",
    "no-useless-return": "error",
    "object-shorthand": "error",
    "prefer-template": "error",
    "no-var": "error",
    "prefer-const": "error",

    "typescript/consistent-type-imports": "error",
    "typescript/consistent-type-exports": "error",
    "typescript/prefer-readonly": "error",
    "typescript/switch-exhaustiveness-check": "error"
  }
}
```

### Node Config (`src/node.json`)

```json
{
  "$schema": "https://unpkg.com/oxlint/configuration_schema.json",
  "extends": ["./base.json"],
  "plugins": ["node"]
}
```

### React Config (`src/react.json`)

```json
{
  "$schema": "https://unpkg.com/oxlint/configuration_schema.json",
  "extends": ["./base.json"],
  "plugins": ["react", "react-hooks", "jsx-a11y"],
  "rules": {
    "react/require-render-return": "error"
  }
}
```

---

## JS Plugins (6 Total)

These ESLint plugins don't have full native OXLint support and will be loaded as JS plugins:

| Plugin                                             | Rules               | Why Needed                                               |
| -------------------------------------------------- | ------------------- | -------------------------------------------------------- |
| `eslint-plugin-sonarjs`                            | 31 rules            | Cognitive complexity, code smells (critical for AI code) |
| `eslint-plugin-perfectionist`                      | 4 rules             | Interfaces, object-types, JSX props sorting              |
| `eslint-plugin-react-compiler`                     | Compiler rules      | React 19+ compatibility (OXLint doesn't have it)         |
| `eslint-plugin-react-you-might-not-need-an-effect` | 10 rules            | useEffect anti-patterns (critical for AI code)           |
| `@eslint-react/eslint-plugin`                      | strict-type-checked | Enhanced React rules beyond basic OXLint react           |
| `@vitest/eslint-plugin`                            | all preset          | Comprehensive test coverage (critical for AI code)       |

### Why These Are Critical for AI-Generated Code

1. **sonarjs**: AI generates duplicate code, overly complex functions
2. **perfectionist**: Consistent code structure aids readability
3. **react-compiler**: AI may use patterns incompatible with React Compiler
4. **react-you-might-not-need-an-effect**: AI overuses useEffect constantly
5. **@eslint-react**: Strict type-checked rules catch subtle React issues
6. **vitest**: AI tests often lack assertions, have duplicate names, etc.

### Plugin File Template (`src/plugins/sonarjs.ts`)

```typescript
import sonarjs from "eslint-plugin-sonarjs";

export default sonarjs;
```

---

## Oxfmt Configuration

### Base Config (`src/base.json`)

```json
{
  "$schema": "https://unpkg.com/oxfmt/configuration_schema.json",
  "experimentalSortImports": {
    "internalPattern": ["#", "#/**"],
    "newlinesBetween": false,
    "groups": [
      "type",
      ["type-parent", "type-sibling", "type-index", "type-internal"],
      "builtin",
      "external",
      "internal",
      ["parent", "sibling", "index"],
      "side-effect",
      "unknown"
    ]
  }
}
```

### React Config (`src/react.json`)

```json
{
  "$schema": "https://unpkg.com/oxfmt/configuration_schema.json",
  "experimentalSortImports": {
    "internalPattern": ["#", "#/**"],
    "newlinesBetween": false,
    "groups": [
      "type",
      ["type-parent", "type-sibling", "type-index", "type-internal"],
      "builtin",
      "external",
      "internal",
      ["parent", "sibling", "index"],
      "side-effect",
      "unknown"
    ]
  },
  "experimentalTailwindcss": {
    "attributes": ["class", "className", "/.*ClassName/"],
    "functions": ["tv"]
  }
}
```

### CLI Tool (`src/cli.ts`)

```typescript
#!/usr/bin/env node
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const preset = args.includes("--react") ? "react" : "base";

const configPath = resolve(import.meta.dirname, `${preset}.json`);
const targetPath = resolve(process.cwd(), ".oxfmtrc.json");

copyFileSync(configPath, targetPath);
console.log(`Created .oxfmtrc.json with ${preset} preset`);
```

**Usage:**

```bash
npx @kasoa/oxfmt-config init          # Generates base config
npx @kasoa/oxfmt-config init --react  # Generates react config with Tailwind
```

---

## Plugin Migration Reference

### Plugins with Native OXLint Support (No JS Plugin Needed)

| Plugin                          | OXLint Equivalent                    | Notes            |
| ------------------------------- | ------------------------------------ | ---------------- |
| `@eslint/js`                    | Built-in categories                  | Full coverage    |
| `typescript-eslint`             | `typescript` plugin + `--type-aware` | Full coverage    |
| `eslint-plugin-unicorn-x`       | `unicorn` plugin                     | Most rules       |
| `eslint-plugin-import-lite`     | `import` plugin                      | Full coverage    |
| `eslint-plugin-unused-imports`  | `no-unused-vars` rule                | Built-in         |
| `eslint-plugin-no-barrel-files` | `oxc/no-barrel-file`                 | Native rule      |
| `eslint-plugin-regexp`          | `regexp` plugin                      | Full coverage    |
| `eslint-plugin-n`               | `node` plugin                        | Full coverage    |
| `eslint-plugin-react-hooks`     | `react-hooks` plugin                 | Basic hooks only |
| `eslint-plugin-jsx-a11y`        | `jsx-a11y` plugin                    | Full coverage    |
| `eslint-plugin-react-refresh`   | `react/only-export-components`       | Native           |
| `eslint-config-flat-gitignore`  | Automatic `.gitignore` reading       | Built-in         |

### Plugins Requiring JS Plugins

| Plugin                                             | Reason                                               |
| -------------------------------------------------- | ---------------------------------------------------- |
| `eslint-plugin-sonarjs`                            | No native support                                    |
| `eslint-plugin-perfectionist`                      | Only import sorting in Oxfmt                         |
| `eslint-plugin-react-compiler`                     | No native support (not in react-hooks)               |
| `eslint-plugin-react-you-might-not-need-an-effect` | No native support                                    |
| `@eslint-react/eslint-plugin`                      | OXLint only has basic react, not strict-type-checked |
| `@vitest/eslint-plugin`                            | OXLint coverage incomplete for "all" preset          |

---

## Package Scripts

### `@kasoa/oxlint-config`

```json
{
  "scripts": {
    "dev": "tsgo --watch",
    "build": "tsgo",
    "lint": "oxlint --type-aware --fix .",
    "format": "oxfmt .",
    "typecheck": "tsgo --noEmit",
    "test": "echo 'No tests'",
    "prepublishOnly": "pnpm build"
  }
}
```

### `@kasoa/oxfmt-config`

```json
{
  "scripts": {
    "dev": "tsgo --watch",
    "build": "tsgo",
    "lint": "oxlint --type-aware --fix .",
    "format": "oxfmt .",
    "typecheck": "tsgo --noEmit",
    "test": "echo 'No tests'",
    "prepublishOnly": "pnpm build"
  }
}
```

---

## Implementation Phases

### Phase 0: Backport Improvements to `@kasoa/eslint-config`

- [ ] Remove `@typescript-eslint/naming-convention` from typescript-eslint.ts
- [ ] Simplify perfectionist.ts (keep 4 rules: imports, named-imports, interfaces, object-types + jsx-props)
- [ ] Delete json.ts
- [ ] Remove `jsonConfig` from index.ts
- [ ] Remove `eslint-plugin-json-schema-validator` from package.json
- [ ] Test that eslint still works

### Phase 1: Create `@kasoa/oxfmt-config`

- [ ] Create package.json
- [ ] Create tsconfig.json
- [ ] Create src/base.json
- [ ] Create src/react.json
- [ ] Create src/cli.ts
- [ ] Test CLI locally

### Phase 2: Create `@kasoa/oxlint-config`

- [ ] Create package.json
- [ ] Create tsconfig.json
- [ ] Create src/base.json
- [ ] Create src/node.json
- [ ] Create src/react.json
- [ ] Create JS plugin files:
  - [ ] src/plugins/sonarjs.ts
  - [ ] src/plugins/perfectionist.ts
  - [ ] src/plugins/react-compiler.ts
  - [ ] src/plugins/react-you-might-not-need-an-effect.ts
  - [ ] src/plugins/eslint-react.ts
  - [ ] src/plugins/vitest.ts
- [ ] Test locally

### Phase 3: Test Integration

- [ ] Build both packages
- [ ] Test oxlint with configs
- [ ] Test oxfmt with configs
- [ ] Verify all rules work as expected

### Phase 4: Documentation

- [ ] Add README to oxlint-config
- [ ] Add README to oxfmt-config
- [ ] Document CLI usage

---

## Open Questions (Answered)

| Question               | Answer                                                |
| ---------------------- | ----------------------------------------------------- |
| Package names          | `@kasoa/oxlint-config`, `@kasoa/oxfmt-config`         |
| Version                | `0.0.1`                                               |
| TypeScript             | Yes, using native `tsgo`                              |
| `printWidth`           | Use Oxfmt default (100)                               |
| Naming convention rule | **REMOVE** - low value vs noise                       |
| React Compiler         | **JS PLUGIN** - OXLint react-hooks doesn't include it |
| Cognitive complexity   | Keep via sonarjs JS plugin                            |
| JSON validation        | **REMOVE** - editors handle this                      |
| @eslint-react          | **JS PLUGIN** - OXLint only has basic react           |
| @vitest                | **JS PLUGIN** - OXLint coverage incomplete            |
| Gitignore              | OXLint reads `.gitignore` automatically               |
| No barrel files        | Native `oxc/no-barrel-file` rule                      |

---

## Risks and Mitigations

| Risk                              | Mitigation                      |
| --------------------------------- | ------------------------------- |
| Oxfmt Tailwind bugs               | RustyWind as fallback if needed |
| Type-aware linting issues         | Can disable per-package         |
| JS plugin performance (6 plugins) | Still 10-15x faster than ESLint |
| Oxfmt `extends` not supported     | CLI tool generates config       |
| Nursery rules unstable            | Set to "warn" not "error"       |

---

## Future Improvements

1. **Wait for Oxfmt `extends`** - When issue #16394 is resolved, switch from CLI to `extends`
2. **Port JS plugins to native** - As OXLint adds native support, remove JS plugins:
   - Watch for @eslint-react support
   - Watch for vitest "all" preset coverage
   - Watch for React Compiler integration
3. **Monitor nursery rules** - Promote stable ones to error, disable problematic ones
4. **Deprecate old packages** - Eventually phase out `@kasoa/eslint-config` and `@kasoa/prettier-config`
