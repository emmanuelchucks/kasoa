# Contributing to Kasoa

## Documentation

A package README is for people using the package: versions, installation, config recipes, options and gotchas. It doesn't restate what the code, its types or a rule's error message already say. Repository workflow, rule policy and releases live here.

## Tooling policy

Human review is the main constraint. Strict checks give both hand-written and generated changes useful backpressure and make code more predictable to review.

- Treat a failure as feedback about owned code before changing the rule.
- Allow narrow, explained exceptions for real runtime, protocol, generated-code, framework, or external-signature constraints.
- Do not preserve unchanged behavior behind `reduce`, recursion, promise chains, wrappers, or helpers merely to evade a lint rule.
- Add or strengthen rules only when repository or representative consumer evidence shows that they prevent useful classes of defects.
- Avoid speculative rules, false positives, duplicate enforcement, and compatibility work for unsupported tool versions.
- Prefer a native Oxlint rule. A `kasoa/` JavaScript rule is for what no native rule covers: any JavaScript rule at all makes lint hand each file to JavaScript, roughly doubling Oxlint's own time (type-aware checks cost more than both).
- Preserve clear runtime boundaries between Node, browsers, React Native, Cloudflare Workers, and their test environments.

For example, parallelize independent asynchronous work. Keep dependent work as a clear sequential loop and document a local `no-await-in-loop` exception at the relevant `await` when ordering is required.

## Verification

Use the versions declared by `.node-version` and `packageManager`, then install the locked dependency graph:

```bash
corepack enable
pnpm install --frozen-lockfile
```

Run the repository gate before requesting review; GitHub Actions runs the same command on pull requests and `main`:

```bash
pnpm verify
```

It audits dependencies, checks formatting, lint and types, runs the tests, builds the packages, runs Publint and Are The Types Wrong, and lints a project that installs the packed package. Commit hooks give earlier feedback but aren't the gate.

## Package changes

Add a Changeset for every consumer-visible package change. Confirm the affected package and bump level with:

```bash
pnpm exec changeset status
```

Do not version or publish packages as part of an ordinary feature or maintenance pull request.

## Releases

The Release workflow maintains one rolling `chore: version packages` pull request. Ordinary package changes only update that pull request. Publishing starts only after a maintainer explicitly authorizes and merges the generated pull request.

Before merging it, review the generated versions and changelogs, then require a successful dispatched `Verify` run whose head SHA equals the pull request's current head SHA. Follow `.agents/skills/release/SKILL.md` for release prerequisites, monitoring, and recovery.

Never merge or publish merely to validate a proposed change.
