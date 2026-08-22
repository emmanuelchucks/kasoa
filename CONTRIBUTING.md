# Contributing to Kasoa

Kasoa publishes strict shared TypeScript tooling. This guide documents how the repository is maintained. Package READMEs document how consumers use the published packages.

## Documentation audiences

Keep npm package READMEs focused on supported versions, installation, exported behavior, configuration recipes, customization, and troubleshooting. Put repository workflow, design rationale, rule-selection policy, verification, and release procedures here.

A package README may explain a strict consumer-facing contract. It should not require consumers to understand Kasoa's internal review process.

## Tooling policy

Human review is the main constraint. Strict checks give both hand-written and generated changes useful backpressure and make code more predictable to review.

- Treat a failure as feedback about owned code before changing the rule.
- Allow narrow, explained exceptions for real runtime, protocol, generated-code, framework, or external-signature constraints.
- Do not preserve unchanged behavior behind `reduce`, recursion, promise chains, wrappers, or helpers merely to evade a lint rule.
- Add or strengthen rules only when repository or representative consumer evidence shows that they prevent useful classes of defects.
- Avoid speculative rules, false positives, duplicate enforcement, and compatibility work for unsupported tool versions.
- Preserve clear runtime boundaries between Node, browsers, React Native, Cloudflare Workers, and their test environments.

For example, parallelize independent asynchronous work. Keep dependent work as a clear sequential loop and document a local `no-await-in-loop` exception at the relevant `await` when ordering is required.

## Verification

Use the versions declared by `.node-version` and `packageManager`, then install the locked dependency graph:

```bash
corepack enable
pnpm install --frozen-lockfile
```

Run the canonical repository gate before requesting review:

```bash
pnpm verify
```

This audits dependencies, checks repository formatting and every package, runs tests, builds packages, applies Publint and Are The Types Wrong checks, and exercises packed consumers. GitHub Actions runs the same command. Commit hooks provide earlier staged-file feedback but are not the authoritative gate.

## Package changes

Add a Changeset for every consumer-visible package change. Confirm the affected package and bump level with:

```bash
pnpm exec changeset status
```

Do not version or publish packages as part of an ordinary feature or maintenance pull request.

## Releases

Releases are separate, reviewed maintainer actions:

1. Confirm release-worthy changes and their Changesets are already committed.
2. Run `pnpm verify` from a clean worktree.
3. Run `pnpm exec changeset version` and review the generated versions, changelogs, and release commit.
4. Run `pnpm exec vp run release` with the required npm credentials.
5. Push the release commit and tags, then verify the published versions with `npm view`.

Never publish, merge, or deploy merely to validate a proposed change.
