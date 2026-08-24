---
name: release
description: Prepare, ship, or recover a Kasoa Changesets release.
---

# Release

## Prepare

1. Confirm every consumer-visible package change has the correct `.changeset/*.md` file.
2. Run `pnpm exec changeset status` and review the affected packages and bump levels.
3. Run `pnpm verify`.
4. Send the source change and Changeset through normal review. The Release workflow maintains the rolling `chore: version packages` pull request.

## Ship

Do not merge or publish unless the user explicitly says to ship.

1. Review the generated versions, changelogs, and commit in the rolling version pull request.
2. Read its current head SHA. Require a successful `workflow_dispatch` run of `Verify` with the same head SHA. A successful run for an older SHA does not qualify.
3. Merge only the generated version pull request.
4. Monitor the resulting Release run through publish and tag reconciliation.
5. For every expected version, run `npm view <package>@<version> version` and confirm the expected package tag resolves to the release commit.

## Recovery

1. Keep the generated version commit on `main`. Inspect every expected package version in npm and every expected package tag before retrying.
2. For versions absent from npm, rerun the failed Release workflow for the same commit. A partial retry skips versions already accepted by npm.
3. If npm accepted a version but its tag is missing, use that version's npm provenance to prove the exact release commit. Confirm the package manifest at that commit has the same name and version and that the expected `<package>@<version>` tag is absent. Create only that ref at the proven commit.
4. If provenance does not prove the commit, stop. Do not guess, create another bump, republish, or publish locally.

## Preconditions

- GitHub Actions can create pull requests with `GITHUB_TOKEN`.
- The GitHub `npm` environment allows deployments only from `main`.
- Each npm package trusts this repository, `.github/workflows/release.yml`, and the `npm` environment.
- The Release workflow's `GITHUB_TOKEN` can create the expected `refs/tags/<package>@<version>` refs.
