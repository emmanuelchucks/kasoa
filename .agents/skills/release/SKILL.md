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
- Confirm the root Vite+ task graph still defines the release validation flow.
- Run the root validation tasks and fix failures before versioning or publishing.
- Confirm the worktree is clean before versioning unless the user explicitly wants to review pending changes first.

## Workflow

1. Review pending changesets and the packages they affect.
2. Add or fix `.changeset/*.md` files if needed.
3. Run `pnpm exec vp run build`.
4. Run `pnpm exec vp run check`.
5. Run `pnpm exec vp run test`.
6. Run `pnpm exec changeset version`.
7. Review generated version and changelog updates.
8. Commit the release versioning changes.
9. Run `pnpm exec vp run release`.
10. Push the release commit and tags.
11. Verify the published package versions with `npm view`.

## Rules

- Prefer `patch` for pre-1.0 packages unless the user explicitly asks for a different bump.
- Keep the release flow local. Do not instruct the user to wait for CI, merge a version PR, or use a GitHub release bot.
- Do not assume root `package.json` scripts exist when the repo models workflow through Vite+ tasks. Check the root `vite.config.ts` task graph first.
- If publish fails because of auth, OTP, or npm state, fix that first and rerun `pnpm exec vp run release`.
- If push is rejected, rebase on `main` and push again with tags.
