---
"@kasoa/vite-plus-config": patch
---

Ignore dependency/build output folders in the shared format and lint defaults so Vite+ checks do not crawl `node_modules` or generated bundles when a consumer has a sparse ignore file. The React preset now enables browser globals by default; React Native and Expo projects that want to reject DOM globals can override `lint.env.browser` to `false`.
