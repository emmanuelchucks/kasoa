---
"@kasoa/vite-plus-config": patch
---

Reject `matchAll` in React Native code: Hermes leaves named groups out of its results, so `match.groups` is `undefined` on the phone while tests in Node pass.
