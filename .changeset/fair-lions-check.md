---
"@kasoa/vite-plus-config": patch
---

Align the React Native lint profile with the bundled Hermes runtime by allowing safe copied-array sorting, retaining `toReversed`, and rejecting unsupported `toSorted` and `Intl.RelativeTimeFormat` calls.
