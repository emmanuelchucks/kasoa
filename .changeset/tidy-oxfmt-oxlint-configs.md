---
"@kasoa/oxfmt-config": patch
"@kasoa/oxlint-config": patch
---

Migrate `@kasoa/oxfmt-config` to JS exports so consumers can re-export presets from a local `oxfmt.config.ts` instead of pointing at packaged JSON files.

Tighten `@kasoa/oxlint-config` with stricter high-signal native rules and unused-disable reporting while avoiding the broader noise from the full restriction category.
