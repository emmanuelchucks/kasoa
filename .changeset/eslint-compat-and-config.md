---
"@kasoa/eslint-config": patch
---

Improve ESLint config package compatibility and lint stability.

- Keep ESLint on v9 for current plugin ecosystem compatibility.
- Add a targeted SonarJS inline suppression to avoid a false positive in the rule map.
- Keep `eslint-plugin-import-lite` on a compatible release to avoid TypeScript declaration resolution errors during build.
