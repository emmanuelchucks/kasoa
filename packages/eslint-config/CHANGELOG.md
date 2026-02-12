# @kasoa/eslint-config

## 0.0.26

### Patch Changes

- 7ef45bd: Improve ESLint config package compatibility and lint stability.
  - Keep ESLint on v9 for current plugin ecosystem compatibility.
  - Add a targeted SonarJS inline suppression to avoid a false positive in the rule map.
  - Keep `eslint-plugin-import-lite` on a compatible release to avoid TypeScript declaration resolution errors during build.

## 0.0.25

### Patch Changes

- aa4e2a9: Cherry-pick sonarjs rules to remove redundancy and resolve unicorn-x/regexp conflict

## 0.0.24

### Patch Changes

- 54c28c7: Fix exports to match dist output structure

## 0.0.23

### Patch Changes

- ba53521: Revert allowDefaultProject from shared config

## 0.0.22

### Patch Changes

- 664f9c0: Move allowDefaultProject into shared typescript-eslint config and remove unnecessary nullish coalescing

## 0.0.21

### Patch Changes

- 24c0ed4: Remove no-barrel-files rule from both ESLint and OXLint configs

## 0.0.20

### Patch Changes

- 8a31740: Remove eslint-plugin-react-compiler (merged into eslint-plugin-react-hooks v7)

## 0.0.19

### Patch Changes

- 95d5c35: Update dependencies and sync configurations

## 0.0.18

### Patch Changes

- e599b57: Fix no-barrel-files config typing for flat config support.

## 0.0.17

### Patch Changes

- 2ee3a9e: Bump patch versions for updated dependencies and config changes.

## 0.0.16

### Patch Changes

- d6d76ee: Remove no-magic-numbers rule

## 0.0.15

### Patch Changes

- Update perfectionist sorting order: id first, then \*Id patterns, then key. Shorthand props come after ref in JSX.

## 0.0.14

### Patch Changes

- be6a666: Fix invalid group names for sort-jsx-props rule (multiline-member -> multiline-prop, method -> shorthand-prop)
- cf5ec1f: Update perfectionist sorting order: id first, then \*Id patterns, then key. Shorthand props come after ref in JSX.

## 0.0.13

### Patch Changes

- 016c867: Add complexity rules, sorting rules, and refactor plugin configs to use spread

## 0.0.12

### Patch Changes

- 2ca3c5b: Add proper CommonJS support for .cjs/.cts files with correct sourceType, globals, and disabled no-require-imports rule

## 0.0.11

### Patch Changes

- 281d3a6: Add explicit file globs to React ESLint configs and condense typescript-eslint file patterns

## 0.0.10

### Patch Changes

- 88f5287: Add projectService to typescript-eslint config and simplify README examples

## 0.0.9

### Patch Changes

- 6cf6423: Add JSON schema validation and scope typescript-eslint to JS/TS files only

## 0.0.8

### Patch Changes

- 32fa67c: Disable `@eslint-react/no-unstable-context-value` rule - unnecessary with react-compiler

## 0.0.7

### Patch Changes

- 69b1639: Update dependencies to latest versions

## 0.0.6

### Patch Changes

- 739f4a6: Enhance vitest and React ESLint rules

## 0.0.5

### Patch Changes

- 6e1b490: Consolidates unused variable linting to single source of truth

## 0.0.4

### Patch Changes

- 2dbdca1: # @kasoa/eslint-config

  Replace eslint-plugin-jsx-a11y-x with official eslint-plugin-jsx-a11y and update dependencies

  # @kasoa/prettier-config

  Update ESLint and TypeScript preview dependencies

## 0.0.3

### Patch Changes

- a6e8992: Add Prettier config package with base and React presets; enhance ESLint config with React effect usage rules
- 5590162: feat(eslint-config): add eslint-plugin-react-you-might-not-need-an-effect and update dependencies

## 0.0.2

### Patch Changes

- 6df602e: Add @kasoa/eslint-config package with base, node, and React ESLint presets for initial release.
