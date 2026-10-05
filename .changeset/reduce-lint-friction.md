---
"@kasoa/vite-plus-config": minor
---

Remove three style rules that added friction without preventing defects: `promise/prefer-await-to-then`, `unicorn/no-await-expression-member`, and `typescript/explicit-module-boundary-types`. Inferred return types from libraries such as TanStack DB are no longer forced into hand-written annotations, and fire-and-forget promises can use `.catch()` directly instead of wrapper functions.
