---
"@kasoa/env": patch
---

Return validated environment values directly from `defineEnv(schema, source)`, accept generated platform binding interfaces without index signatures, and support the maintained Node.js 22 line. This is a hard API cutover from the curried parser form.
