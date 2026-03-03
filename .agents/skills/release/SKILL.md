---
name: release
description: Local release workflow for the Kasoa monorepo using Changesets and pnpm. Use when preparing, versioning, publishing, or verifying npm package releases from the local machine.
---

# Release

Use the local Changesets workflow only.

## Preconditions

- Confirm `npm whoami` succeeds.
- Confirm release-worthy code changes are already committed.
- Confirm a changeset exists for each package that should publish.
- Run `pnpm run ci` and fix failures before versioning or publishing.
- Confirm the worktree is clean before versioning unless the user explicitly wants to review pending changes first.

## Workflow

1. Review pending changesets and the packages they affect.
2. Add or fix `.changeset/*.md` files if needed.
3. Run `pnpm run ci`.
4. Run `pnpm changeset version`.
5. Review generated version and changelog updates.
6. Commit the release versioning changes.
7. Run `pnpm release`.
8. Push the release commit and tags.
9. Verify the published package versions with `npm view`.

## Rules

- Prefer `patch` for pre-1.0 packages unless the user explicitly asks for a different bump.
- Keep the release flow local. Do not instruct the user to wait for CI, merge a version PR, or use a GitHub release bot.
- If publish fails because of auth, OTP, or npm state, fix that first and rerun `pnpm release`.
- If push is rejected, rebase on `main` and push again with tags.
