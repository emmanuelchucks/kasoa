---
"@kasoa/vite-plus-config": patch
---

React Native Vitest tests may mock a module by name (`vi.mock("react-native", ...)`): `vitest/prefer-import-in-mock` is off there, because stand-ins for native modules rarely match their types.
