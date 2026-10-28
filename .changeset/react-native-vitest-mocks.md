---
"@kasoa/vite-plus-config": patch
---

Allow `vi.mock` and `vi.doMock` in React Native Vitest tests. Node cannot load React Native or Expo native modules, so those tests need module mocks. Node, browser and Worker tests still reject them.
