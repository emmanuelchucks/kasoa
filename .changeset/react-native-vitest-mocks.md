---
"@kasoa/vite-plus-config": patch
---

Allow `vi.mock` and `vi.doMock` in React Native Vitest tests. Node cannot load React Native or Expo native modules, so those tests need module mocks. Node, browser and Worker tests still reject them. The new `reactNativeTestLint` profile does the same in a workspace override, so a monorepo can allow mocks in its React Native app's tests only. `@cloudflare/vitest-plugin` is now required at 1.4 or newer, the first version that supports Vitest 5.
